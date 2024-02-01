import {Injectable} from "@angular/core";
import {IApiService} from "./api.service.interface";
import {Observable, of} from "rxjs";
import {ICubEmoPart} from "../../types/ICubEmoPart";
import {ICubEmoEmotion} from "../../types/ICubEmoEmotion";
import {ICubEmoColor} from "../../types/ICubEmoColor";
import {ApplicationArgsTemplate} from "../../types/ApplicationArgsTemplate";
import {FSM} from "../../types/FSM";
import {Application} from "../../types/Application";
import {Robot} from "../../types/Robot";


@Injectable({
    providedIn: 'root'
})
export class ApiMockService implements IApiService {
    camLeftGetImgRes(robotName: string): Observable<{ width: number; height: number }> {
        return undefined;
    }

    camLeftGetURI(robotName: string): Observable<URL> {
        return undefined;
    }

    camRightGetImgRes(robotName: string): Observable<{ width: number; height: number }> {
        return undefined;
    }

    camRightGetURI(robotName: string): Observable<URL> {
        return undefined;
    }

    checkAsyncRequestStatus(requestID: string, initCallback: () => void, runningCallback: () => void, doneCallback: (retval: any) => void, failedCallback: () => void): void {
    }

    emoAngry(robotName: string): Observable<any> {
        return undefined;
    }

    emoClosingEyes(robotName: string): Observable<any> {
        return undefined;
    }

    emoCun(robotName: string): Observable<any> {
        return undefined;
    }

    emoEbSmile(robotName: string): Observable<any> {
        return undefined;
    }

    emoEbSurprised(robotName: string): Observable<any> {
        return undefined;
    }

    emoEvil(robotName: string): Observable<any> {
        return undefined;
    }

    emoNeutral(robotName: string): Observable<any> {
        return undefined;
    }

    emoOpeningEyes(robotName: string): Observable<any> {
        return undefined;
    }

    emoSad(robotName: string): Observable<any> {
        return undefined;
    }

    emoSendCmd(robotName: string, part: ICubEmoPart, emotion: ICubEmoEmotion): Observable<any> {
        return undefined;
    }

    emoSetBrightness(robotName: string, brightness: 0 | 1 | 2 | 3 | 4 | 5): Observable<any> {
        return undefined;
    }

    emoSetColor(robotName: string, color: ICubEmoColor): Observable<any> {
        return undefined;
    }

    emoSmile(robotName: string): Observable<any> {
        return undefined;
    }

    emoSurprised(robotName: string): Observable<any> {
        return undefined;
    }

    fsmGetCurrentState(robotName: string, appName: string, appPort: string): Observable<string> {
        return undefined;
    }

    gazeBlockEyes(robotName: string, vergence: number): Observable<any> {
        return undefined;
    }

    gazeBlockNeck(robotName: string): Observable<any> {
        return undefined;
    }

    gazeClearEyes(robotName: string): Observable<any> {
        return undefined;
    }

    gazeClearNeck(robotName: string): Observable<any> {
        return undefined;
    }

    gazeInit(robotName: string): Observable<any> {
        return undefined;
    }

    gazeLookAtAbsAngles(robotName: string, azimuth: number, elevation: number, vergence: number, waitMotionDone?: boolean, timeout?: number): Observable<any> {
        return undefined;
    }

    gazeLookAtFixationPoint(robotName: string, x: number, y: number, z: number, waitMotionDone?: boolean, timeout?: number): Observable<any> {
        return undefined;
    }

    gazeLookAtRelAngles(robotName: string, azimuth: number, elevation: number, vergence: number, waitMotionDone?: boolean, timeout?: number): Observable<any> {
        return undefined;
    }

    gazeReset(robotName: string): Observable<any> {
        return undefined;
    }

    gazeSetParams(robotName: string, neck_tt: number, eyes_tt: number): Observable<any> {
        return undefined;
    }

    gazeSetTrackingMode(robotName: string, mode: boolean): Observable<any> {
        return undefined;
    }

    gazeWaitMotionDone(robotName: string, period?: number, timeout?: number): Observable<any> {
        return undefined;
    }

    gazeWaitMotionOnset(robotName: string, speedRef?: number, period?: number, maxAttempts?: number): Observable<any> {
        return undefined;
    }

    getApplicationArgsTemplate(robotName: string, appName: string, appPort: string): Observable<ApplicationArgsTemplate> {
        return undefined;
    }

    getApplicationFSM(robotName: string, appName: string, appPort: string): Observable<FSM> {
        return undefined;
    }

    getApplications(robotName: string): Observable<Application[]> {
        return undefined;
    }

    getRobotActions(robotName: string): Observable<any> {
        return undefined;
    }

    getRobots(): Observable<Robot[]> {

        let applications
        for(let i = 0; i<5;i++){
            console.log(i)
        }

        let application1 = new Application("icub1","iCub1App1","","")
        return undefined;
    }

    getServices(robotName: string, appName: string): Observable<any> {
        return undefined;
    }

    playAction(robotName: string, actionID: string, sync: boolean, initCallback: () => void, runningCallback: () => void, doneCallback: (retval: any) => void, failedCallback: () => void): Observable<any> {
        return undefined;
    }

    runService<T = void>(robotName: string, appName: string, appPort: string, serviceName: string, body?: any): Observable<T> {
        return undefined;
    }

    runServiceAsync(robotName: string, appName: string, appPort: string, serviceName: string, body?: any): Observable<string> {
        return undefined;
    }

    setApplicationArgs(robotName: string, appName: string, appPort: string, args: any): Observable<any> {
        return undefined;
    }

    speechClose(robotName: string): Observable<any> {
        return undefined;
    }

    speechSay(robotName: string, sentence: string, waitActionDone?: boolean): Observable<any> {
        return undefined;
    }

    speechSayAsync(robotName: string, sentence: string, waitActionDone?: boolean): Observable<string> {
        return undefined;
    }

}
