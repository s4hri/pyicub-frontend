import {Component, inject, Input} from '@angular/core';
import {ApiService} from "../services/api/api.service";
import {ICubEmoPart} from "../types/ICubEmoPart";
import {ICubEmoEmotion} from "../types/ICubEmoEmotion";
import {ICubEmoColor} from "../types/ICubEmoColor";
import {Application} from "../types/Application";
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";

@Component({
  selector: 'app-widget-base',
  templateUrl: './widget-base.component.html',
  styleUrl: './widget-base.component.css'
})
export class WidgetBaseComponent{

  @Input()
  application:Application;

  @Input()
  plugin:Plugin;

  @Input()
  width?:number

  @Input()
  height?:number

  protected apiService = inject(ApiService);
  protected appStateService = inject(AppStateService);

  getApplicationFSM(){
    return this.apiService.getApplicationFSM(this.application.robotName,this.application.name,this.application.url.port)
  }

  checkAsyncRequestStatus(requestID:string,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    return this.apiService.checkAsyncRequestStatus(requestID,initCallback,runningCallback,doneCallback,failedCallback)
  }

  runService(serviceName:string,body:any){
    return this.apiService.runService(this.application.robotName,this.application.name,this.application.url.port,serviceName,body)
  }

  runServiceAsync(serviceName:string,body:any = {}){
    return this.apiService.runServiceAsync(this.application.robotName,this.application.name,this.application.url.port,serviceName,body)
  }

  fsmGetCurrentState(){
    return this.apiService.fsmGetCurrentState(this.application.robotName,this.application.name,this.application.url.port)
  }

  fsmRunStep(trigger:string){
    return this.apiService.runServiceAsync(this.application.robotName,this.application.name,this.application.url.port,"fsm.runStep",{trigger:trigger})
  }

  getRobotActions(){
    return this.apiService.getRobotActions(this.application.robotName,this.application.name,this.application.url.port)
  }

  playActionSync(actionID:string){
    return this.apiService.playActionSync(this.application.robotName,this.application.name,this.application.url.port,actionID)
  }

  playActionAsync(actionID:string){
    return this.apiService.playActionAsync(this.application.robotName,this.application.name,this.application.url.port,actionID)
  }

  emoAngry(){
    return this.apiService.emoAngry(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoClosingEyes(){
    return this.apiService.emoClosingEyes(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoCun(){
    return this.apiService.emoCun(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoEbSmile(){
    return this.apiService.emoEbSmile(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoEbSurprised(){
    return this.apiService.emoEbSurprised(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoEvil(){
    return this.apiService.emoEvil(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoNeutral(){
    return this.apiService.emoNeutral(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoOpeningEyes(){
    return this.apiService.emoOpeningEyes(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoSad() {
    return this.apiService.emoSad(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoSendCmd(part:ICubEmoPart,emotion:ICubEmoEmotion){
    return this.apiService.emoSendCmd(this.application.robotName,this.application.name,this.application.url.port,part,emotion)
  }

  emoSetBrightness(brightness: 0 | 1 | 2 | 3 | 4 | 5){
    return this.apiService.emoSetBrightness(this.application.robotName,this.application.name,this.application.url.port,brightness)
  }

  emoSetColor(color:ICubEmoColor){
    return this.apiService.emoSetColor(this.application.robotName,this.application.name,this.application.url.port,color)
  }

  emoSmile(){
    return this.apiService.emoSmile(this.application.robotName,this.application.name,this.application.url.port)
  }

  emoSurprised(){
    return this.apiService.emoSurprised(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeBlockEyes(vergence:number){
    return this.apiService.gazeBlockEyes(this.application.robotName,this.application.name,this.application.url.port,vergence)
  }

  gazeBlockNeck(){
    return this.apiService.gazeBlockNeck(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeClearEyes(){
    return this.apiService.gazeClearEyes(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeClearNeck(){
    return this.apiService.gazeClearNeck(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeInit(){
    return this.apiService.gazeInit(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeLookAtAbsAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtAbsAngles(this.application.robotName,this.application.name,this.application.url.port,azimuth,elevation,vergence,waitMotionDone,timeout)
  }

  gazeLookAtFixationPoint(x:number, y:number, z:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtFixationPoint(this.application.robotName,this.application.name,this.application.url.port,x,y,z,waitMotionDone,timeout)
  }

  gazeLookAtRelAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtRelAngles(this.application.robotName,this.application.name,this.application.url.port,azimuth,elevation,vergence,waitMotionDone,timeout)
  }

  gazeReset(){
    return this.apiService.gazeReset(this.application.robotName,this.application.name,this.application.url.port)
  }

  gazeSetParams(neck_tt:number, eyes_tt:number){
    return this.apiService.gazeSetParams(this.application.robotName,this.application.name,this.application.url.port,neck_tt,eyes_tt)
  }

  gazeSetTrackingMode(mode:boolean){
    return this.apiService.gazeSetTrackingMode(this.application.robotName,this.application.name,this.application.url.port,mode)
  }

  gazeWaitMotionDone(period:number = 0.1 ,timeout:number = 0){
    return this.apiService.gazeWaitMotionDone(this.application.robotName,this.application.name,this.application.url.port,period,timeout)
  }

  gazeWaitMotionOnset(speedRef:number = 0 ,period:number = 0.1,maxAttempts:number=50){
    return this.apiService.gazeWaitMotionOnset(this.application.robotName,this.application.name,this.application.url.port,speedRef,period,maxAttempts)
  }

  speechClose(){
    return this.apiService.speechClose(this.application.robotName,this.application.name,this.application.url.port)
  }

  speechSay(sentence:string,waitActionDone:boolean = true){
    return this.apiService.speechSay(this.application.robotName,this.application.name,this.application.url.port,sentence,waitActionDone)
  }

  speechSayAsync(sentence:string,waitActionDone:boolean = true){
    return this.apiService.speechSayAsync(this.application.robotName,this.application.name,this.application.url.port,sentence,waitActionDone)
  }


  camLeftGetURI(){
    return this.apiService.camLeftGetURI(this.application.robotName,this.application.name,this.application.url.port)
  }

  camRightGetURI(){
    return this.apiService.camRightGetURI(this.application.robotName,this.application.name,this.application.url.port)
  }

  camLeftGetImgRes(){
    return this.apiService.camLeftGetImgRes(this.application.robotName,this.application.name,this.application.url.port)
  }

  camRightGetImgRes(){
    return this.apiService.camRightGetImgRes(this.application.robotName,this.application.name,this.application.url.port)
  }

}
