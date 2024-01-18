import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {GetApplicationsServicesResponse} from "./types/GetApplicationServicesResponse";
import {interval, map, switchMap, takeWhile, tap} from "rxjs";
import {GetRobotActionsResponse} from "./types/GetRobotActionsResponse";
import {GetRequestStatusResponse} from "./types/GetRequestStatusResponse";
import {ICubRequestStatus} from "../types/ICubRequestStatus";
import {Application} from "../types/Application";
import {FSM, State} from "../types/FSM";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //I path simbolici utilizzati saranno sostituiti da quelli veri tramite la configurazione presente in proxy.conf.json

  private asyncRequestsStatus:{ [key:string]:ICubRequestStatus } = {}
  constructor(private http: HttpClient) { }

  getRobots(){
    //const path = "pyicub";
    const path = "/api/pyicub";
    //return this.http.get<GetRobotsResponse>(`/robots`);
    return this.http.get<GetRobotsResponse>(path);

  }
  getApplications(robotName:string){
    //const path = `pyicub/${robotName}`;
    const path = `/api/pyicub/${robotName}`;
    //return this.http.get<GetApplicationsResponse>(`/applications/${robotName}`);
    return this.http.get<GetApplicationsResponse>(path).pipe(
      map(response => {

        /*
        let states = [
          {
            "stateName": "Nome primo stato",
            "action": "foo",
            "triggers": {
              "a": "Nome secondo stato",
              "b": "Nome terzo stato"
            }
          },
          {
            "stateName": "Nome secondo stato",
            "action": "foo",
            "triggers": {
              "a": "Nome quarto stato"
            }
          },
          {
            "stateName": "Nome terzo stato",
            "action": "foo",
            "triggers": {
              "a": "Nome quinto stato"
            }
          },
          {
            "stateName": "Nome quarto stato",
            "action": "foo"
          },
          {
            "stateName": "Nome quinto stato",
            "action": "foo"
          }
        ]

         */
        return response.map(applicationObject => new Application(robotName,applicationObject.name,applicationObject.url)
        )
      })
    );
  }



  getApplicationFSM(robotName:string,appName:string){

    return this.runService<getApplicationFSMResponse>(robotName,appName,"fsm.getTransitions").pipe(
      map(response => {
        let stateNames:string[] = [];
        let states:State[] = [];

        for (let responseItem of response){
          if (!stateNames.includes(responseItem.dest)){
            stateNames.push(responseItem.dest)
          }
          if (!stateNames.includes(responseItem.source)){
            stateNames.push(responseItem.source)
          }
        }

        states = stateNames.map(stateName => {
          let triggers:{[key:string]:string} = {};
          for (let responseItem of response){
            if(responseItem.source === stateName){
              triggers[responseItem.trigger] = responseItem.dest;
            }
          }

          return new State(stateName,triggers)
        })

        let initIndex = states.findIndex(state => state.stateName === "init");
        let initState = states.find(state => state.stateName === "init");
        let tempState = states[0];
        states[0] = initState;
        states[initIndex] = tempState;

        return new FSM(states)
      })
    )
  }

  getServices(robotName:string="", appName:string=""){
    const path = `/api/pyicub/${robotName}/${appName}`;
    return this.http.get<GetApplicationsServicesResponse>(path).pipe(
      map(response => {
        return Object.entries(response).map(([key, value]) => value)
      })
    )
  }

  checkAsyncRequestStatus(requestID:string,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    const url = new URL(requestID).pathname;
    const requestStatusPath = `/api${url}`;
    this.asyncRequestsStatus[requestID] = ICubRequestStatus.INIT
    initCallback()

    interval(100).pipe(
      switchMap(() => {
        return this.http.get<GetRequestStatusResponse>(requestStatusPath).pipe(
          tap(response => {
            switch (response.status) {
              case ICubRequestStatus.RUNNING:
                if(this.asyncRequestsStatus[requestID] !== ICubRequestStatus.RUNNING){
                  this.asyncRequestsStatus[requestID] = ICubRequestStatus.RUNNING;
                  runningCallback();
                }
                break;
              case ICubRequestStatus.DONE:
                if(this.asyncRequestsStatus[requestID] !== ICubRequestStatus.DONE){
                  this.asyncRequestsStatus[requestID] = ICubRequestStatus.DONE;
                  doneCallback(response.retval);
                }
                break;
              case ICubRequestStatus.FAILED:
                this.asyncRequestsStatus[requestID] = ICubRequestStatus.FAILED;
                failedCallback();
                break;
              default:
                console.log("unknown response status.")
            }
          })
        )
      }),
      takeWhile(response => response.status !== ICubRequestStatus.DONE && response.status !== ICubRequestStatus.FAILED && response.status !== ICubRequestStatus.TIMEOUT,true)
    ).subscribe()

  }

  runService<T>(robotName:string, appName:string,serviceName:string,body:any = {}){
    let params = new HttpParams().set('sync','');
    const path = `/api/pyicub/${robotName}/${appName}/${serviceName}`

    return this.http.post<T>(path,body, {params:params})
  }

  runServiceAsync(robotName:string, appName:string,serviceName:string,body:any = {}){
    const path = `/api/pyicub/${robotName}/${appName}/${serviceName}`;
    return this.http.post<string>(path,body);
  }

  getRobotActions(robotName:string){
    return this.runService(robotName,"helper","actions.getActions")
  }

  playAction(robotName:string,actionID:string,sync:boolean = true,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    if(sync) {
      return this.runService(robotName,"helper","actions.playAction",{action_id:actionID})
    } else {
      return this.runServiceAsync(robotName,"helper","actions.playAction",{action_id:actionID,initCallback,runningCallback,doneCallback,failedCallback})
    }

  }





}

type getApplicationFSMResponse = getApplicationFSMResponseElement[]
interface getApplicationFSMResponseElement{
  dest: string,
  source: string,
  trigger: string
}
