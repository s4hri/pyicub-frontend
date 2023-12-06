import { Component,OnInit } from '@angular/core';
import {RobotsService} from "./services/robots.service";
import {UserSessionService} from "./user-session.service";
import {Robot} from "./robotInterface";
import {Router} from "@angular/router";
import {Application} from "./application";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isDrawerOpened:boolean = true;
  robots$ = this.robotsService.robots$;
  isLoadingRobots$ = this.robotsService.isLoadingRobots$;
  selectedRobot$ = this.userSessionService.selectedRobot$;
  selectedApplication$ = this.userSessionService.selectedApplication$;
  constructor(private robotsService:RobotsService, private userSessionService: UserSessionService, private router:Router){}

  onReloadButtonClick(){
    this.robotsService.updateRobots();
  }

  onDrawerCellClick(robot:Robot){
    this.userSessionService.selectRobot(robot);
    this.router.navigate(['icub']);
    this.isDrawerOpened = false;
  }

  onAppBarRobotCellClick(robot:Robot){
    console.log(robot);
  }

  onAppBarApplicationCellClick(application:Application){
    console.log(application);
  }

  onAppBarButtonClick(){
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  ngOnInit(): void {
    this.robotsService.updateRobots();
  }

}
