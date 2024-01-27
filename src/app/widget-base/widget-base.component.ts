import {Component, inject, Input, OnDestroy} from '@angular/core';
import {ApiService} from "../api/api.service";
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
export class WidgetBaseComponent implements OnDestroy{

  @Input()
  application:Application;

  @Input()
  plugin:Plugin;

  @Input()
  width?:string

  @Input()
  height?:string

  protected apiService = inject(ApiService);
  protected appStateService = inject(AppStateService);

  ngOnDestroy() {
    //this._saveData()
  }

  private _saveData(){
    const baseData = {
        x:this.plugin.x,
        y:this.plugin.y,
        enabled:this.plugin.enabled,
        cols:this.plugin.cols,
        rows:this.plugin.rows
    }
    const customData = this.getDataToSave();
    const data = {
        ...baseData,
        data:{...customData}
    }
    if(this.plugin){
        this.plugin.data = data;
    }
    //TODO aggiungi persistenza con localstorage
  }

  getDataToSave():any{
    //funzione di cui fare l'override e che deve restituire l'oggetto data da salvare.
  }

  private _loadData(){
    //TODO aggiungi logica per caricamento dati. In teoria ogni plugin implementa la propria. Questa funzione recupera il json dall'app state e chiama la funzione loadData che sarà sovrascritta dal singolo widget
    const data = this.plugin.data;
    this.loadData(data)
  }

  loadData(data:any){

  }

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

  fsmRunStep(trigger:string){
    return this.apiService.runServiceAsync(this.application.robotName,this.application.name,this.application.url.port,"fsm.runStep",{trigger:trigger})
  }

  getRobotActions(){
    return this.apiService.getRobotActions(this.application.robotName)
  }

  playAction(actionID:string,sync:boolean = true,initCallback:() => void = () => {},runningCallback: () => void = () => {},doneCallback: (retval:any) => void = () => {},failedCallback: () => void = () => {}){
    return this.apiService.playAction(this.application.robotName,actionID,sync,initCallback,runningCallback,doneCallback,failedCallback)
  }

  emoAngry(){
    return this.apiService.emoAngry(this.application.robotName)
  }

  emoClosingEyes(){
    return this.apiService.emoClosingEyes(this.application.robotName)
  }

  emoCun(){
    return this.apiService.emoCun(this.application.robotName)
  }

  emoEbSmile(){
    return this.apiService.emoEbSmile(this.application.robotName)
  }

  emoEbSurprised(){
    return this.apiService.emoEbSurprised(this.application.robotName)
  }

  emoEvil(){
    return this.apiService.emoEvil(this.application.robotName)
  }

  emoNeutral(){
    return this.apiService.emoNeutral(this.application.robotName)
  }

  emoOpeningEyes(){
    return this.apiService.emoOpeningEyes(this.application.robotName)
  }

  emoSad() {
    return this.apiService.emoSad(this.application.robotName)
  }

  emoSendCmd(part:ICubEmoPart,emotion:ICubEmoEmotion){
    return this.apiService.emoSendCmd(this.application.robotName,part,emotion)
  }

  emoSetBrightness(brightness: 0 | 1 | 2 | 3 | 4 | 5){
    return this.apiService.emoSetBrightness(this.application.robotName,brightness)
  }

  emoSetColor(color:ICubEmoColor){
    return this.apiService.emoSetColor(this.application.robotName,color)
  }

  emoSmile(){
    return this.apiService.emoSmile(this.application.robotName)
  }

  emoSurprised(){
    return this.apiService.emoSurprised(this.application.robotName)
  }

  gazeBlockEyes(vergence:number){
    return this.apiService.gazeBlockEyes(this.application.robotName,vergence)
  }

  gazeBlockNeck(){
    return this.apiService.gazeBlockNeck(this.application.robotName)
  }

  gazeClearEyes(){
    return this.apiService.gazeClearEyes(this.application.robotName)
  }

  gazeClearNeck(){
    return this.apiService.gazeClearNeck(this.application.robotName)
  }

  gazeInit(){
    return this.apiService.gazeInit(this.application.robotName)
  }

  gazeLookAtAbsAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtAbsAngles(this.application.robotName,azimuth,elevation,vergence,waitMotionDone,timeout)
  }

  gazeLookAtFixationPoint(x:number, y:number, z:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtFixationPoint(this.application.robotName,x,y,z,waitMotionDone,timeout)
  }

  gazeLookAtRelAngles(azimuth:number, elevation:number, vergence:number, waitMotionDone:boolean = true, timeout:number = 0.0){
    return this.apiService.gazeLookAtRelAngles(this.application.robotName,azimuth,elevation,vergence,waitMotionDone,timeout)
  }

  gazeReset(){
    return this.apiService.gazeReset(this.application.robotName)
  }

  gazeSetParams(neck_tt:number, eyes_tt:number){
    return this.apiService.gazeSetParams(this.application.robotName,neck_tt,eyes_tt)
  }

  gazeSetTrackingMode(mode:boolean){
    return this.apiService.gazeSetTrackingMode(this.application.robotName,mode)
  }

  gazeWaitMotionDone(period:number = 0.1 ,timeout:number = 0){
    return this.apiService.gazeWaitMotionDone(this.application.robotName,period,timeout)
  }

  gazeWaitMotionOnset(speedRef:number = 0 ,period:number = 0.1,maxAttempts:number=50){
    return this.apiService.gazeWaitMotionOnset(this.application.robotName,speedRef,period,maxAttempts)
  }

  speechClose(){
    return this.apiService.speechClose(this.application.robotName)
  }

  speechSay(sentence:string,waitActionDone:boolean = true){
    return this.apiService.speechSay(this.application.robotName,sentence,waitActionDone)
  }

  speechSayAsync(sentence:string,waitActionDone:boolean = true){
    return this.apiService.speechSayAsync(this.application.robotName,sentence,waitActionDone)
  }


  camLeftGetURI(){
    return this.apiService.camLeftGetURI(this.application.robotName)
  }

  camRightGetURI(){
    return this.apiService.camRightGetURI(this.application.robotName)
  }

  camLeftGetImgRes(){
    return this.apiService.camLeftGetImgRes(this.application.robotName)
  }

  camRightGetImgRes(){
    return this.apiService.camRightGetImgRes(this.application.robotName)
  }

}
