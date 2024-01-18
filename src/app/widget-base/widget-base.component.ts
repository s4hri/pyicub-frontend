import {Component, inject, Input} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ICubEmoPart} from "../types/ICubEmoPart";
import {ICubEmoEmotion} from "../types/ICubEmoEmotion";
import {ICubEmoColor} from "../types/ICubEmoColor";
import {timeout} from "rxjs";

@Component({
  selector: 'app-widget-base',
  templateUrl: './widget-base.component.html',
  styleUrl: './widget-base.component.css'
})
export class WidgetBaseComponent {
  @Input()
  appName:string;

  @Input()
  robotName:string;

  protected apiService = inject(ApiService);

  getApplicationFSM(){
    return this.apiService.getApplicationFSM(this.robotName,this.appName)
  }

  checkAsyncRequestStatus(requestID:string,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    return this.apiService.checkAsyncRequestStatus(requestID,initCallback,runningCallback,doneCallback,failedCallback)
  }

  runService(serviceName:string,body:any){
    return this.apiService.runService(this.robotName,this.appName,serviceName,body)
  }

  runServiceAsync(serviceName:string,body:any = {},initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    return this.apiService.runServiceAsync(this.robotName, this.appName,serviceName,body)
  }

  fsmRunStep(trigger:string){
    return this.apiService.runServiceAsync(this.robotName,this.appName,"fsm.runStep",{trigger:trigger})
  }

  getRobotActions(){
    return this.apiService.runService(this.robotName,"helper","actions.getActions")
  }

  playAction(actionID:string,sync:boolean = true,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    if(sync) {
      return this.apiService.runService(this.robotName,"helper","actions.playAction",{action_id:actionID})
    } else {
      return this.apiService.runServiceAsync(this.robotName,"helper","actions.playAction",{action_id:actionID})
    }

  }

  emoAngry(){
    return this.apiService.runService(this.robotName,"helper","emo.angry")
  }

  emoClosingEyes(){
    return this.apiService.runService(this.robotName,"helper","emo.closingEyes")
  }

  emoCun(){
    return this.apiService.runService(this.robotName,"helper","emo.cun")
  }

  emoEbSmile(){
    return this.apiService.runService(this.robotName,"helper","emo.eb_smile")
  }

  emoEbSurprised(){
    return this.apiService.runService(this.robotName,"helper","emo.eb_surprised")
  }

  emoEvil(){
    return this.apiService.runService(this.robotName,"helper","emo.evil")
  }

  emoNeutral(){
    return this.apiService.runService(this.robotName,"helper","emo.neutral")
  }

  emoOpeningEyes(){
    return this.apiService.runService(this.robotName,"helper","emo.openingEyes")
  }

  emoSad() {
    return this.apiService.runService(this.robotName, "helper", "emo.sad")
  }

  emoSendCmd(part:ICubEmoPart,emotion:ICubEmoEmotion){
    return this.apiService.runService(this.robotName, "helper", "emo.sendCmd",{part:part,emo:emotion})
  }

  emoSetBrightness(brightness: 0 | 1 | 2 | 3 | 4 | 5){
    return this.apiService.runService(this.robotName, "helper", "emo.setBrightness",{brightness:brightness})
  }

  emoSetColor(color:ICubEmoColor){
    return this.apiService.runService(this.robotName, "helper", "emo.setColor",{color:color})
  }

  emoSmile(){
    return this.apiService.runService(this.robotName, "helper", "emo.smile")
  }

  emoSurprised(){
    return this.apiService.runService(this.robotName, "helper", "emo.surprised")
  }

  gazeBlockEyes(vergence:number){
    return this.apiService.runService(this.robotName, "helper", "gaze.blockEyes",{vergence:vergence})
  }

  gazeBlockNeck(){
    return this.apiService.runService(this.robotName, "helper", "gaze.blockNeck")
  }

  gazeClearEyes(){
    return this.apiService.runService(this.robotName, "helper", "gaze.clearEyes")
  }

  gazeClearNeck(){
    return this.apiService.runService(this.robotName, "helper", "gaze.clearNeck")
  }

  gazeInit(){
    return this.apiService.runService(this.robotName, "helper", "gaze.init")
  }

  gazeLookAtAbsAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.runService(this.robotName, "helper", "gaze.lookAtAbsAngles",{azi:azimuth,ele:elevation,ver:vergence,waitMotionDone:waitMotionDone,timeout:timeout})
  }

  gazeLookAtFixationPoint(x:number, y:number, z:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.runService(this.robotName, "helper", "gaze.lookAtFixationPoint",{x:x,y:y,z:z,waitMotionDone:waitMotionDone,timeout:timeout})
  }

  gazeLookAtRelAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.runService(this.robotName, "helper", "gaze.lookAtRelAngles",{azi:azimuth,ele:elevation,ver:vergence,waitMotionDone:waitMotionDone,timeout:timeout})
  }

  gazeReset(){
    return this.apiService.runService(this.robotName, "helper", "gaze.reset")
  }

  gazeSetParams(neck_tt:number, eyes_tt:number){
    return this.apiService.runService(this.robotName, "helper", "gaze.setParams",{neck_tt:neck_tt,eyes_tt:eyes_tt})
  }

  gazeSetTrackingMode(mode:boolean){
    return this.apiService.runService(this.robotName, "helper", "gaze.setTrackingMode",{mode:mode})
  }

  gazeWaitMotionDone(period:number = 0.1 ,timeout:number = 0){
    return this.apiService.runService(this.robotName, "helper", "gaze.waitMotionDone",{period:period, timeout:timeout})
  }

  gazeWaitMotionOnset(speedRef:number = 0 ,period:number = 0.1,maxAttempts:number=50){
    return this.apiService.runService(this.robotName, "helper", "gaze.waitMotionOnset",{speed_ref:speedRef, period:period,max_attempts:maxAttempts})
  }

  speechClose(){
    return this.apiService.runService(this.robotName, "helper", "speech.close")
  }

  speechSay(sentence:string,waitActionDone:boolean = true){
    return this.apiService.runService(this.robotName,"helper","speech.say",{something:sentence,waitActionDone:waitActionDone})
  }

}
