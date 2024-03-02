import { Observable } from 'rxjs';
import { Robot } from '../../types/Robot';
import { Application } from '../../types/Application';
import { ApplicationArgsTemplate } from '../../types/ApplicationArgsTemplate';
import { FSM } from '../../types/FSM';
import { ICubEmoPart } from '../../types/ICubEmoPart';
import { ICubEmoEmotion } from '../../types/ICubEmoEmotion';
import { ICubEmoColor } from '../../types/ICubEmoColor';
import {Injectable, InjectionToken} from "@angular/core";


export const API_SERVICE_TOKEN = new InjectionToken<IApiService>(
  'API SERVICE TOKEN'
);

@Injectable({
  providedIn: 'root'
})
export abstract class IApiService {
  abstract getRobots(): Observable<Robot[]>;
  abstract getApplications(robotName: string): Observable<Application[]>;
  abstract getApplicationArgsTemplate(robotName: string, appName: string, appPort: string): Observable<ApplicationArgsTemplate>;
  abstract setApplicationArgs(robotName: string, appName: string, appPort: string, args: any): Observable<any>;
  abstract getApplicationFSM(robotName: string, appName: string, appPort: string): Observable<FSM>;
  abstract getServices(robotName: string, appName: string): Observable<any>;
  abstract checkAsyncRequestStatus(requestID: string, initCallback: () => void, runningCallback: () => void, doneCallback: (retval: any) => void, failedCallback: () => void): void;
  abstract runService<T = void>(robotName: string, appName: string, appPort: string, serviceName: string, body?: any): Observable<T>;
  abstract runServiceAsync(robotName: string, appName: string, appPort: string, serviceName: string, body?: any): Observable<string>;
  abstract fsmGetCurrentState(robotName: string, appName: string, appPort: string): Observable<string>;
  abstract emoAngry(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoClosingEyes(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoCun(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoEbSmile(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoEbSurprised(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoEvil(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoNeutral(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoOpeningEyes(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoSad(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoSendCmd(robotName: string, appName: string, appPort: string, part: ICubEmoPart, emotion: ICubEmoEmotion): Observable<any>;
  abstract emoSetBrightness(robotName: string, appName: string, appPort: string, brightness: 0 | 1 | 2 | 3 | 4 | 5): Observable<any>;
  abstract emoSetColor(robotName: string, appName: string, appPort: string, color: ICubEmoColor): Observable<any>;
  abstract emoSmile(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract emoSurprised(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeBlockEyes(robotName: string, appName: string, appPort: string, vergence: number): Observable<any>;
  abstract gazeBlockNeck(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeClearEyes(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeClearNeck(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeInit(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeLookAtAbsAngles(robotName: string, appName: string, appPort: string, azimuth: number, elevation: number, vergence: number, waitMotionDone?: boolean, timeout?: number): Observable<any>;
  abstract gazeLookAtFixationPoint(robotName: string, appName: string, appPort: string, x: number, y: number, z: number, waitMotionDone?: boolean, timeout?: number): Observable<any>;
  abstract gazeLookAtRelAngles(robotName: string, appName: string, appPort: string, azimuth: number, elevation: number, vergence: number, waitMotionDone?: boolean, timeout?: number): Observable<any>;
  abstract gazeReset(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract gazeSetParams(robotName: string, appName: string, appPort: string, neck_tt: number, eyes_tt: number): Observable<any>;
  abstract gazeSetTrackingMode(robotName: string, appName: string, appPort: string, mode: boolean): Observable<any>;
  abstract gazeWaitMotionDone(robotName: string, appName: string, appPort: string, period?: number, timeout?: number): Observable<any>;
  abstract gazeWaitMotionOnset(robotName: string, appName: string, appPort: string, speedRef?: number, period?: number, maxAttempts?: number): Observable<any>;
  abstract speechClose(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract speechSay(robotName: string, appName: string, appPort: string, sentence: string, waitActionDone?: boolean): Observable<any>;
  abstract speechSayAsync(robotName: string, appName: string, appPort: string, sentence: string, waitActionDone?: boolean): Observable<string>;
  abstract camLeftGetURI(robotName: string, appName: string, appPort: string): Observable<URL>;
  abstract camLeftGetImgRes(robotName: string, appName: string, appPort: string): Observable<{ width: number, height: number }>;
  abstract camRightGetImgRes(robotName: string, appName: string, appPort: string): Observable<{ width: number, height: number }>;
  abstract camRightGetURI(robotName: string, appName: string, appPort: string): Observable<URL>;
  abstract getRobotActions(robotName: string, appName: string, appPort: string): Observable<any>;
  abstract playActionSync(robotName: string, appName: string, appPort: string, actionID: string): Observable<any>;
  abstract playActionAsync(robotName:string, appName: string, appPort: string, actionID: string): Observable<any>;

  constructor(){

  }
}
