import { Injectable } from '@angular/core';
import {Robot} from "./robotInterface";
import {BehaviorSubject} from "rxjs";
import {Application} from "./application";

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
    this.selectedRobot = robot;
  }

  selectApplication(application:Application){
    this.selectedApplication = application;
  }
  constructor() { }
}
