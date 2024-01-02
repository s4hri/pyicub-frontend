import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {GetApplicationsServicesResponse} from "./types/GetApplicationServicesResponse";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {GetRobotActionsResponse} from "./types/GetRobotActionsResponse";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //I path simbolici utilizzati saranno sostituiti da quelli veri tramite la configurazione presente in proxy.conf.json

  constructor(private http: HttpClient) { }

  getRobots(){
    //const path = "pyicub";
    const path = "/api/pyicub";
    //return this.http.get<GetRobotsResponse>(`/robots`);
    return this.http.get<GetRobotsResponse>(path);

  }
  getApplications(robotName:string){
    //const path = `pyicub/${robotName}`;
    const path = `/api/pyicub/${robotName}`;
    //return this.http.get<GetApplicationsResponse>(`/applications/${robotName}`);
    return this.http.get<GetApplicationsResponse>(path);
  }

  getServices(robotName:string="", appName:string=""){
    const path = `/api/pyicub/${robotName}/${appName}`;
    return this.http.get<GetApplicationsServicesResponse>(path).pipe(
      map(response => {
        return Object.entries(response).map(([key, value]) => value)
      })
    )
  }

  getRobotActions(robotName:string){
    const path = `/api/pyicub/${robotName}/helper/actions.getActions`;
    return this.http.post<GetRobotActionsResponse>(path,{})
  }

}
