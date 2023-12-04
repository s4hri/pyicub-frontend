import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {BehaviorSubject} from "rxjs";
import {Robot} from "../robotInterface";

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  private readonly _robots = new BehaviorSubject<Robot[]>([]);
  readonly robots$ = this._robots.asObservable();
  get robots(): Robot[] {
    return this._robots.getValue();
  }
  private set robots(val: Robot[]) {
    this._robots.next(val);
  }

  private _isLoadingRobots = new BehaviorSubject<boolean>(false);
  readonly isLoadingRobots$ = this._isLoadingRobots.asObservable();
  get isLoadingRobots():boolean{
    return this._isLoadingRobots.getValue();
  }
  private set isLoadingRobots(val: boolean){
    this._isLoadingRobots.next(val);
  }

  constructor(private apiService:ApiService) { }

  updateRobots(){
    this.isLoadingRobots = true;

    /*
    this.apiService.getRobots().subscribe(
      robots => {
        this.robots = robots;
        this.isLoadingRobots = false;
      }
    )*/

    setTimeout(() =>{this.apiService.getRobots().subscribe(
      robots => {
        this.robots = robots;
        this.isLoadingRobots = false;
      }
    )},2000)

  }

}
