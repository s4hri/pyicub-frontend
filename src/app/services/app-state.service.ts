import { Injectable } from '@angular/core';
import {Robot} from "../types/Robot";
import {ApiService} from "../api/api.service";
import {BehaviorSubject} from "rxjs";
import {Application} from "../types/Application";
import {pluginIndex} from "../plugins";
import {Plugin} from "../types/Plugin";

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

  constructor(public apiService:ApiService) {

    this.apiService.getRobots().subscribe(robots => {
      this.availableRobots = robots

      for(let robot of robots){
        robot.selectedApplication = undefined;
        this.apiService.getApplications(robot.name).subscribe(applications => {

          for(let application of applications){
            for (const [pluginName, componentName] of Object.entries(pluginIndex)) {
              application.plugins.push(new Plugin(pluginName,componentName,false,20,20))
            }
          }

          robot.applications = applications
        })
      }

    })
  }

  updateRobots() {
    this.isLoadingRobots = true;

    this.apiService.getRobots().subscribe(robots => {
      this.availableRobots = robots
      this.isLoadingRobots = false;

      for(let robot of robots){
        robot.selectedApplication = undefined;
        this.apiService.getApplications(robot.name).subscribe(applications => {

          for(let application of applications){
            console.log(application)
            for (const [pluginName, componentName] of Object.entries(pluginIndex)) {
              application.plugins.push(new Plugin(pluginName,componentName,false,20,20))
            }
          }

          robot.applications = applications
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


}
