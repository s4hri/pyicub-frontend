import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {GetApplicationsServicesResponse} from "./types/GetApplicationServicesResponse";
import {catchError, forkJoin, interval, map, mergeMap, of, switchMap, takeWhile, tap} from "rxjs";
import {GetRequestStatusResponse} from "./types/GetRequestStatusResponse";
import {ICubRequestStatus} from "../../types/ICubRequestStatus";
import {Application} from "../../types/Application";
import {FSM, FSMNode, FSMEdge} from "../../types/FSM";
import {GetApplicationArgsTemplateResponse} from "./types/GetApplicationArgsTemplateResponse";
import {ApplicationArgsTemplate} from "../../types/ApplicationArgsTemplate";
import {ApplicationArgType} from "../../types/ApplicationArgType";
import {environment} from "../../../environments/environment";
import {ICubEmoPart} from "../../types/ICubEmoPart";
import {ICubEmoEmotion} from "../../types/ICubEmoEmotion";
import {ICubEmoColor} from "../../types/ICubEmoColor";
import {Robot} from "../../types/Robot";
import {pluginIndex} from "../../plugins";
import {Plugin} from "../../types/Plugin";
import * as defaultDashboardConfig from "../../defaultDashboardConfiguration.json"
import {IApiService} from "./api.service.interface";
import {GetRobotActionsResponse} from "./types/GetRobotActionsResponse";
import {LocalStorageService} from "../local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  private port = environment.apiPort
  private hostname = environment.apiHost
  private scheme = environment.apiScheme

  //I path simbolici utilizzati saranno sostituiti da quelli veri tramite la configurazione presente in proxy.conf.json

  private asyncRequestsStatus: { [key: string]: ICubRequestStatus } = {}

  constructor(private http: HttpClient,private localStorageService:LocalStorageService) {
  }

  getRobots() {
    const path = `${this.scheme}://${this.hostname}:${this.port}/pyicub`;
    return this.http.get<Robot[]>(path).pipe(
      //Per ogni robot, vado ad effettuare una chiamata per ottenere le relative applicazioni. Quando tutte le chiamate sono terminate, restituisco i robot.
      mergeMap(robots => {
        const robotsObservables = robots.map(robot => this.getApplications(robot.name).pipe(
          map(applications => {
            robot.applications = applications
            console.log(robot)
            return robot
          })
        ));

        return (forkJoin(robotsObservables))

      })
    )

  }


  getApplications(robotName: string) {
    const path = `${this.scheme}://${this.hostname}:${this.port}/pyicub/${robotName}`;
    return this.http.get<GetApplicationsResponse>(path).pipe(
      //inizio a creare le applicazioni
      map(response => {
        return response.map(applicationObject => new Application(robotName, applicationObject.name, applicationObject.url)
        )
      }),
      //Per ogni applicazione vado ad ottenere l'argsTemplate.
      switchMap(applications => {
        const applicationsObservables = applications.map(application =>

          this.getApplicationArgsTemplate(robotName, application.name, application.url.port).pipe(
            catchError(() => {
              return of({})
            }),
            map(argsTemplate => {
              application.argsTemplate = argsTemplate;
              const savedDashboard = this.localStorageService.getDashboardConfig(application)
              for (const [pluginName, componentName] of Object.entries(pluginIndex)) {
                const pluginDefaultData = (savedDashboard && savedDashboard[pluginName]) ? savedDashboard[pluginName] : defaultDashboardConfig[pluginName];
                const x = pluginDefaultData?.x || 0;
                const y = pluginDefaultData?.y || 0;
                const cols = pluginDefaultData?.cols || 20;
                const rows = pluginDefaultData?.rows || 20;
                const enabled = pluginDefaultData?.enabled || false;
                application.plugins.push(new Plugin(pluginName, componentName, enabled, cols, rows, x, y))
              }
              return application
            })
          )
        );

        return forkJoin(applicationsObservables);
      })
    );
  }

  private getArgsTemplate(args): ApplicationArgsTemplate {
    const templateTypes: ApplicationArgsTemplate = {}
    for (const [key, value] of Object.entries(args)) {
      templateTypes[key] = {
        type: this.getArgType(value),
        value: value
      }
    }

    return templateTypes;
  }

  private getArgType(value: any): ApplicationArgType {
    if (typeof (value) === "string") {
      return ApplicationArgType.STRING
    } else if (typeof (value) === "boolean") {
      return ApplicationArgType.BOOLEAN
    } else if (typeof (value) === "number") {
      return ApplicationArgType.NUMBER
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        return ApplicationArgType.ARRAY_STRING
      } else {
        let elem = value[0];
        if (typeof (elem) == "string") {
          return ApplicationArgType.ARRAY_STRING
        } else if (typeof (elem) == "number") {
          return ApplicationArgType.ARRAY_NUMBER
        }
      }
    }

    return ApplicationArgType.STRING;
  }

  getApplicationArgsTemplate(robotName: string, appName: string, appPort: string) {
    return this.runService<GetApplicationArgsTemplateResponse>(robotName, appName, appPort, "getArgsTemplate").pipe(
      map(response => {
        return this.getArgsTemplate(response)
      })
    )
  }

  setApplicationArgs(robotName: string, appName: string, appPort: string, args) {
    return this.runService(robotName, appName, appPort, "setArgs", {"input_args": args})
  }


  getApplicationFSM(robotName: string, appName: string, appPort: string) {

    return this.runService<getApplicationFSMResponse>(robotName, appName, appPort, "fsm.getTransitions").pipe(
      map(response => {
        let nodes: FSMNode[] = [];
        let edges: FSMEdge[] = [];

        for (let responseItem of response) {

          //se il nodo sorgente o destinazione non è gia stato creato, lo aggiungo alla lista.
          if (!nodes.find(node => node.id === responseItem.dest)) {
            nodes.push({name: responseItem.dest, id: responseItem.dest})
          }

          if (!nodes.find(node => node.id === responseItem.source)) {
            nodes.push({name: responseItem.source, id: responseItem.source})
          }

          /*
          if (!stateNames.includes(responseItem.dest)){
            stateNames.push(responseItem.dest)
          }
          if (!stateNames.includes(responseItem.source)){
            stateNames.push(responseItem.source)
          }

           */

          //creo il collegamento
          const edge: FSMEdge = {
            sourceID: responseItem.source,
            targetID: responseItem.dest,
            trigger: responseItem.trigger
          }
          edges.push(edge)

        }

        if (nodes.length === 0) {
          throw (new Error("Non ci sono FSM associate a questa applicazione"))
        }

        /*
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

         */

        //imposto lo stato init come primo dell'array, in modo da farlo comparire a sinistra rispetto agli altri
        const initIndex = nodes.findIndex(node => node.id === 'init')

        if (initIndex !== 0) {
          const temp = nodes[0]
          nodes[0] = nodes[initIndex]
          nodes[initIndex] = temp
        }

        const fsmDefaultConfig = defaultDashboardConfig["fsm"];
        const x = fsmDefaultConfig.x || 0;
        const y = fsmDefaultConfig.y || 0;
        const cols = fsmDefaultConfig.cols || 50;
        const rows = fsmDefaultConfig.rows || 70;

        return new FSM(nodes, edges, cols, rows, x, y)
      })
    )
  }

  getServices(robotName: string = "", appName: string = "") {
    const path = `${this.scheme}://${this.hostname}:${this.port}/pyicub/${robotName}/${appName}`;
    return this.http.get<GetApplicationsServicesResponse>(path).pipe(
      map(response => {
        return Object.entries(response).map(([key, value]) => value)
      })
    )
  }

  checkAsyncRequestStatus(requestID: string, initCallback: () => void = () => {
  }, runningCallback: () => void = () => {
  }, doneCallback: (retval: any) => void = () => {
  }, failedCallback: () => void = () => {
  }) {
    const url = new URL(requestID);
    const requestStatusPath = `${this.scheme}://${this.hostname}:${url.port}${url.pathname}`;
    this.asyncRequestsStatus[requestID] = ICubRequestStatus.INIT
    initCallback()

    interval(100).pipe(
      switchMap(() => {
        return this.http.get<GetRequestStatusResponse>(requestStatusPath).pipe(
          tap(response => {
            switch (response.status) {
              case ICubRequestStatus.RUNNING:
                if (this.asyncRequestsStatus[requestID] !== ICubRequestStatus.RUNNING) {
                  this.asyncRequestsStatus[requestID] = ICubRequestStatus.RUNNING;
                  runningCallback();
                }
                break;
              case ICubRequestStatus.DONE:
                if (this.asyncRequestsStatus[requestID] !== ICubRequestStatus.DONE) {
                  this.asyncRequestsStatus[requestID] = ICubRequestStatus.DONE;
                  doneCallback(response.retval);
                }
                break;
              case ICubRequestStatus.FAILED:
                this.asyncRequestsStatus[requestID] = ICubRequestStatus.FAILED;
                failedCallback();
                break;
              default:
                console.log("unknown response status:")
                console.log(response.status)
                console.log(response)
            }
          })
        )
      }),
      takeWhile(response => response.status !== ICubRequestStatus.DONE && response.status !== ICubRequestStatus.FAILED && response.status !== ICubRequestStatus.TIMEOUT, true)
    ).subscribe()

  }

  runService<T = void>(robotName: string, appName: string, appPort: string, serviceName: string, body: any = {}) {
    let params = new HttpParams().set('sync', '');
    const path = `${this.scheme}://${this.hostname}:${appPort}/pyicub/${robotName}/${appName}/${serviceName}`

    return this.http.post<T>(path, body, {params: params})
  }

  runServiceAsync(robotName: string, appName: string, appPort: string, serviceName: string, body: any = {}) {
    const path = `${this.scheme}://${this.hostname}:${appPort}/pyicub/${robotName}/${appName}/${serviceName}`;
    return this.http.post<string>(path, body);
  }

  fsmGetCurrentState(robotName: string, appName: string, appPort: string) {
    return this.runService<string>(robotName, appName, appPort, "fsm.getCurrentState")
  }

  emoAngry(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.angry")
  }

  emoClosingEyes(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.closingEyes")
  }

  emoCun(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.cun")
  }

  emoEbSmile(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.eb_smile")
  }

  emoEbSurprised(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.eb_surprised")
  }

  emoEvil(robotName: string) {
    return this.runService(robotName, "helper", this.port, "helper", "emo.evil")
  }

  emoNeutral(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.neutral")
  }

  emoOpeningEyes(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.openingEyes")
  }

  emoSad(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.sad")
  }

  emoSendCmd(robotName: string, part: ICubEmoPart, emotion: ICubEmoEmotion) {
    return this.runService(robotName, "helper", this.port, "emo.sendCmd", {part: part, emo: emotion})
  }

  emoSetBrightness(robotName: string, brightness: 0 | 1 | 2 | 3 | 4 | 5) {
    return this.runService(robotName, "helper", this.port, "emo.setBrightness", {brightness: brightness})
  }

  emoSetColor(robotName: string, color: ICubEmoColor) {
    return this.runService(robotName, "helper", this.port, "emo.setColor", {color: color})
  }

  emoSmile(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.smile")
  }

  emoSurprised(robotName: string) {
    return this.runService(robotName, "helper", this.port, "emo.surprised")
  }

  gazeBlockEyes(robotName: string, vergence: number) {
    return this.runService(robotName, "helper", this.port, "gaze.blockEyes", {vergence: vergence})
  }

  gazeBlockNeck(robotName: string) {
    return this.runService(robotName, "helper", this.port, "gaze.blockNeck")
  }

  gazeClearEyes(robotName: string) {
    return this.runService(robotName, "helper", this.port, "gaze.clearEyes")
  }

  gazeClearNeck(robotName: string) {
    return this.runService(robotName, "helper", this.port, "gaze.clearNeck")
  }

  gazeInit(robotName: string) {
    return this.runService(robotName, "helper", this.port, "gaze.init")
  }

  gazeLookAtAbsAngles(robotName: string, azimuth: number, elevation: number, vergence: number, waitMotionDone: boolean = true, timeout: number = 0.0) {
    return this.runService(robotName, "helper", this.port, "gaze.lookAtAbsAngles", {
      azi: azimuth,
      ele: elevation,
      ver: vergence,
      waitMotionDone: waitMotionDone,
      timeout: timeout
    })
  }

  gazeLookAtFixationPoint(robotName: string, x: number, y: number, z: number, waitMotionDone: boolean = true, timeout: number = 0.0) {
    return this.runService(robotName, "helper", this.port, "gaze.lookAtFixationPoint", {
      x: x,
      y: y,
      z: z,
      waitMotionDone: waitMotionDone,
      timeout: timeout
    })
  }

  gazeLookAtRelAngles(robotName: string, azimuth: number, elevation: number, vergence: number, waitMotionDone: boolean = true, timeout: number = 0.0) {
    return this.runService(robotName, "helper", this.port, "gaze.lookAtRelAngles", {
      azi: azimuth,
      ele: elevation,
      ver: vergence,
      waitMotionDone: waitMotionDone,
      timeout: timeout
    })
  }

  gazeReset(robotName: string) {
    return this.runService(robotName, "helper", this.port, "gaze.reset")
  }

  gazeSetParams(robotName: string, neck_tt: number, eyes_tt: number) {
    return this.runService(robotName, "helper", this.port, "gaze.setParams", {neck_tt: neck_tt, eyes_tt: eyes_tt})
  }

  gazeSetTrackingMode(robotName: string, mode: boolean) {
    return this.runService(robotName, "helper", this.port, "gaze.setTrackingMode", {mode: mode})
  }

  gazeWaitMotionDone(robotName: string, period: number = 0.1, timeout: number = 0) {
    return this.runService(robotName, "helper", this.port, "gaze.waitMotionDone", {period: period, timeout: timeout})
  }

  gazeWaitMotionOnset(robotName: string, speedRef: number = 0, period: number = 0.1, maxAttempts: number = 50) {
    return this.runService(robotName, "helper", this.port, "gaze.waitMotionOnset", {
      speed_ref: speedRef,
      period: period,
      max_attempts: maxAttempts
    })
  }

  speechClose(robotName: string) {
    return this.runService(robotName, "helper", this.port, "speech.close")
  }

  speechSay(robotName: string, sentence: string, waitActionDone: boolean = true) {
    return this.runService(robotName, "helper", this.port, "speech.say", {
      something: sentence,
      waitActionDone: waitActionDone
    })
  }

  speechSayAsync(robotName: string, sentence: string, waitActionDone: boolean = true) {
    return this.runServiceAsync(robotName, "helper", this.port, "speech.say", {
      something: sentence,
      waitActionDone: waitActionDone
    })
  }

  camLeftGetURI(robotName: string) {
    return this.runService<string>(robotName, "helper", this.port, "cam_left.getURI").pipe(
      map(stringURL => new URL(stringURL))
    )
  }

  camLeftGetImgRes(robotName: string) {
    return this.runService<number[]>(robotName, "helper", this.port, "cam_left.getImgRes").pipe(
      map(arrayRes => {
        let imgFrameSize = {
          width: 0,
          height: 0
        }

        if (arrayRes) {

          if (arrayRes.length >= 1) {
            imgFrameSize.width = arrayRes[0];
          }

          if (arrayRes.length >= 2) {
            imgFrameSize.height = arrayRes[1];
          }

        }

        return imgFrameSize;

      })
    )
  }

  camRightGetImgRes(robotName: string) {
    return this.runService<number[]>(robotName, "helper", this.port, "cam_right.getImgRes").pipe(
      map(arrayRes => {
        let imgFrameSize = {
          width: 0,
          height: 0
        }

        if (arrayRes) {

          if (arrayRes.length >= 1) {
            imgFrameSize.width = arrayRes[0];
          }

          if (arrayRes.length >= 2) {
            imgFrameSize.height = arrayRes[1];
          }

        }

        return imgFrameSize;

      })
    )
  }

  camRightGetURI(robotName: string) {
    return this.runService<string>(robotName, "helper", this.port, "cam_right.getURI").pipe(
      map(stringURL => new URL(stringURL))
    )
  }

  getRobotActions(robotName: string) {
    return this.runService<GetRobotActionsResponse>(robotName, "helper", this.port, "actions.getActions")
  }

  playActionSync(robotName:string,actionID:string){
    return this.runService<void>(robotName,"helper",this.port,"actions.playAction",{action_id:actionID})
  }

  playActionAsync(robotName:string,actionID:string){
    return this.runServiceAsync(robotName,"helper",this.port,"actions.playAction",{action_id:actionID})
  }

}

type getApplicationFSMResponse = getApplicationFSMResponseElement[]

interface getApplicationFSMResponseElement {
  dest: string,
  source: string,
  trigger: string
}
