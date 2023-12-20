import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Application} from "../application";
import {ApiService} from "../api/api.service";

interface RobotApps{
  [key: string]:Application[]
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private readonly _robotApplications = new BehaviorSubject<RobotApps>({});
  readonly robotApplications$ = this._robotApplications.asObservable();
  get robotApplications(): RobotApps {
    return this._robotApplications.getValue();
  }
  private set robotApplications(val: RobotApps) {
    this._robotApplications.next(val);
  }

  private _isLoadingApplications = new BehaviorSubject<boolean>(false);
  readonly isLoadingApplications$ = this._isLoadingApplications.asObservable();
  get isLoadingApplications():boolean{
    return this._isLoadingApplications.getValue();
  }
  private set isLoadingApplications(val: boolean){
    this._isLoadingApplications.next(val);
  }

  updateRobotApplications(robotName:string){
    this.isLoadingApplications = true;

    this.apiService.getApplications(robotName).subscribe(
      applications => {
        const updatedRobotApplications = {
          ...this.robotApplications
        }
        updatedRobotApplications[robotName] = applications;
        this.robotApplications = updatedRobotApplications;
      }
    )
  }
  constructor(private apiService:ApiService) { }
}
