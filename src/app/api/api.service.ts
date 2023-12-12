import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
import {environment} from "../../environments/environment";

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

}
