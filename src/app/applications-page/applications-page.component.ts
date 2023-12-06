import { Component, OnInit } from '@angular/core';
import {ApplicationsService} from "../services/applications.service";
import {UserSessionService} from "../user-session.service";
import {Application} from "../application";
import {map, Observable, tap} from "rxjs";
import {Robot} from "../robotInterface";

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent implements OnInit{

  applications$: Observable<Application[] | undefined>;
  isLoadingApplications$ = this.applicationsService.isLoadingApplications$;
  selectedRobot: Robot;

  onApplicationClick(application:Application){
    this.userSession.selectApplication(application);
  }

  constructor(private applicationsService:ApplicationsService, private userSession:UserSessionService) {}

  ngOnInit() {


    this.userSession.selectedRobot$.subscribe(robot => {
      this.selectedRobot = robot;
      this.applicationsService.updateRobotApplications(this.selectedRobot.name);
    })

    this.applicationsService.updateRobotApplications(this.selectedRobot.name);

    this.applications$ = this.applicationsService.robotApplications$.pipe(
      tap( value => console.log(value)),
      map(robotApps => robotApps[this.selectedRobot.name])
    )

  }

}
