import { Component, OnInit } from '@angular/core';
import {ApplicationsService} from "../services/applications.service";
import {UserSessionService} from "../services/user-session.service";
import {Application} from "../types/Application";
import {map, Observable, tap} from "rxjs";
import {Robot} from "../types/Robot";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent implements OnInit{

  applications$: Observable<Application[] | undefined>;
  //isLoadingApplications$ = this.applicationsService.isLoadingApplications$;
  //selectedRobot: Robot;
  selectedRobot$ = this.appState.selectedRobot$;

  onApplicationClick(application:Application){
    this.appState.selectApplication(application);
    //this.userSession.selectApplication(application);
    this.router.navigate(['icub/application']);
  }

  constructor(private appState:AppStateService,private router:Router) {}
  //constructor(private applicationsService:ApplicationsService, private userSession:UserSessionService,private router:Router) {}

  ngOnInit() {

    /*
    this.userSession.selectedRobot$.subscribe(robot => {
      this.selectedRobot = robot;
      this.applicationsService.updateRobotApplications(this.selectedRobot.name);
    })

    this.applicationsService.updateRobotApplications(this.selectedRobot.name);

    this.applications$ = this.applicationsService.robotApplications$.pipe(
      tap( value => console.log(value)),
      map(robotApps => robotApps[this.selectedRobot.name])
    )
    console.log(this.userSession.selectedRobot)

     */

  }


}
