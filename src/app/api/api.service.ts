import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {GetApplicationsServicesResponse} from "./types/GetApplicationServicesResponse";
import {interval, map, switchMap, takeWhile, tap} from "rxjs";
import {GetRobotActionsResponse} from "./types/GetRobotActionsResponse";
import {GetRequestStatusResponse} from "./types/GetRequestStatusResponse";
import {ICubRequestStatus} from "../types/ICubRequestStatus";


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
    return this.http.get<GetApplicationsResponse>(path);
  }

  getServices(robotName:string="", appName:string=""){
    const path = `/api/pyicub/${robotName}/${appName}`;
    return this.http.get<GetApplicationsServicesResponse>(path).pipe(
      map(response => {
        return Object.entries(response).map(([key, value]) => value)
      })
    )
  }

  runService(robotName:string, appName:string,serviceName:string,body:any = {}){
    let params = new HttpParams().set('sync','');
    const path = `/api/pyicub/${robotName}/${appName}/${serviceName}`

    return this.http.post(path,body, {params:params})
  }

  runServiceAsync(robotName:string, appName:string,serviceName:string,body:any = {},initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    const path = `/api/pyicub/${robotName}/${appName}/${serviceName}`;

    //effettuo la chiamata al servizio
    this.http.post<string>(path,body).subscribe(requestID => {
      const url = new URL(requestID).pathname;
      const requestStatusPath = `/api${url}`;

      this.asyncRequestsStatus[requestID] = ICubRequestStatus.INIT
      initCallback()

      //ogni 100ms controllo lo stato della richiesta.
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
    )
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
