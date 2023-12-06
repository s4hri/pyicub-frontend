import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GetRobotsResponse} from "./types/GetRobotsResponse";
import {GetApplicationsResponse} from "./types/GetApplicationsResponse";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRobots(){
    const path = "pyicub"
    return this.http.get<GetRobotsResponse>(`${this.baseUrl}/${path}`);
  }

  getApplications(robotName:string){
    const path = robotName;
    return this.http.get<GetApplicationsResponse>(`${this.baseUrl}/${path}`)
  }


}
