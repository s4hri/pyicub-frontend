import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {GetApplicationsServicesResponse} from "./types/GetApplicationServicesResponse";
import {environment} from "../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //I path simbolici utilizzati saranno sostituiti da quelli veri tramite la configurazione presente in proxy.conf.json

  constructor(private http: HttpClient) { }

  getRobots(){
    const path = "pyicub"
    return this.http.get<GetRobotsResponse>(`/robots`);

  }
  getApplications(robotName:string){
    const path = `pyicub/${robotName}`;
    return this.http.get<GetApplicationsResponse>(`/applications/${robotName}`)
  }

  getApplicationServices(robotName:string="",appName:string=""){
    const path = `pyicub/${appName}/${robotName}`;
    return this.http.get<GetApplicationsServicesResponse>('/services').pipe(
      map(response => {
        return Object.entries(response).map(([key, value]) => value)

      })
    )
  }

}
