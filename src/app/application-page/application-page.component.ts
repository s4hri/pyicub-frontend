import {Component, OnInit} from '@angular/core';
import {ApplicationsService} from "../services/applications.service";
import {UserSessionService} from "../user-session.service";
import {Observable} from "rxjs";
import {Application} from "../application";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  applications$:Observable<Application[]>

  constructor(private applicationsService:ApplicationsService, private userSession:UserSessionService) {}

  ngOnInit(): void {
    console.log("APPLICATION PAGE SELECTED ROBOT")
    console.log(this.userSession.selectedRobot)
  }



}
