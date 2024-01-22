import { Injectable } from '@angular/core';
import {Robot} from "../types/Robot";
import {ApiService} from "../api/api.service";
import {BehaviorSubject} from "rxjs";
import {Application} from "../types/Application";
import {pluginIndex} from "../plugins";
import {Plugin} from "../types/Plugin";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private readonly _availableRobots = new BehaviorSubject<Robot[]>([])
  readonly availableRobots$ = this._availableRobots.asObservable();

  get availableRobots():Robot[]{
    return this._availableRobots.getValue();
  }

  private set availableRobots(val:Robot[]){
    this._availableRobots.next(val);
  }

  private _isLoadingRobots = new BehaviorSubject<boolean>(false);
  readonly isLoadingRobots$ = this._isLoadingRobots.asObservable();

  get isLoadingRobots(): boolean {
    return this._isLoadingRobots.getValue();
  }

  private set isLoadingRobots(val: boolean) {
    this._isLoadingRobots.next(val);
  }

  private _selectedRobot = new BehaviorSubject<Robot | undefined>(undefined);
  public selectedRobot$ = this._selectedRobot.asObservable();
  get selectedRobot(){
    return this._selectedRobot.getValue();
  }
  private set selectedRobot(val:Robot | undefined){
    this._selectedRobot.next(val);
  }

  constructor(public apiService:ApiService, private localStorageService:LocalStorageService) {

   this.updateRobots()
  }

  saveData(){
    let appData:{[key:string]:any}
    //appData["availableRobots"] = JSON.stringify(this.availableRobots)

  }

  updateRobots() {
    this.isLoadingRobots = true;

    this.apiService.getRobots().subscribe(robots => {
      console.log("ROBOTS",JSON.parse(JSON.stringify(robots)))
      this.availableRobots = robots
      this.isLoadingRobots = false;

      for(let robot of robots){
        robot.selectedApplication = undefined;
        this.apiService.getApplications(robot.name).subscribe(applications => {

          for(let application of applications){

            this.apiService.getApplicationFSM(robot.name,application.name,application.url.port).subscribe({
              next: fsm => {
                console.log("FSM",fsm)
                application.fsm = fsm;
              },
              error: err => {
                console.log(application,err)
                application.fsm = undefined;
              }
            })

            this.apiService.getApplicationArgsTemplate(robot.name,application.name,application.url.port).subscribe({
              next: argsTemplate => {
                application.argsTemplate = argsTemplate;
              },
              error: err => {
                console.log(application,err)
                application.argsTemplate = {};
              }
            })


            for (const [pluginName, componentName] of Object.entries(pluginIndex)) {
              application.plugins.push(new Plugin(pluginName,componentName,false,20,20))
            }
          }

          robot.applications = applications
          console.log("Robot Applications")
          console.log(robot.applications)
        })
      }

    })

  }

  selectRobot(robot:Robot){
    this.selectedRobot = robot;
  }

  selectApplication(application:Application){
    this.selectedRobot.selectedApplication = application;
  }

  setApplicationArgs(application:Application,args){
    application.args = args;
    return this.apiService.setApplicationArgs(application.robotName,application.name,application.url.port,args)
  }


}
