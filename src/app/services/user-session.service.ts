import { Injectable } from '@angular/core';
import {Robot} from "../types/Robot";
import {BehaviorSubject} from "rxjs";
import {Application} from "../types/Application";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _selectedRobot = new BehaviorSubject<Robot | undefined>(undefined);
  public selectedRobot$ = this._selectedRobot.asObservable();
  get selectedRobot(){
    return this._selectedRobot.getValue();
  }
  private set selectedRobot(val:Robot | undefined){
    this._selectedRobot.next(val);
  }

  private _selectedApplication = new BehaviorSubject<Application | undefined>(undefined);
  public selectedApplication$ = this._selectedApplication.asObservable();
  get selectedApplication(){
    return this._selectedApplication.getValue();
  }

  private set selectedApplication(val:Application | undefined){
    this._selectedApplication.next(val);
  }
  selectRobot(robot:Robot){
    if(robot !== this.selectedRobot){
      this.selectedApplication = null;
    }
    this.selectedRobot = robot;
  }

  selectApplication(application:Application){
    this.selectedApplication = application;
  }
  constructor() { }
}
