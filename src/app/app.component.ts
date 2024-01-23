import { Component,OnInit } from '@angular/core';
import {RobotsService} from "./services/robots.service";
import {UserSessionService} from "./services/user-session.service";
import {Robot} from "./types/Robot";
import {Router} from "@angular/router";
import {Application} from "./types/Application";
import {AppStateService} from "./services/app-state.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isDrawerOpened:boolean = true;
  robots$ = this.appState.availableRobots$;
  isLoadingRobots$ = this.appState.isLoadingRobots$;
  selectedRobot$ = this.appState.selectedRobot$;

  constructor(private appState:AppStateService, private router:Router){}

  onReloadButtonClick(){
    this.appState.updateRobots();
    //this.robotsService.updateRobots();
  }

  onDrawerCellClick(robot:Robot){
    this.appState.selectRobot(robot);
    this.router.navigate(['icub']);
    this.isDrawerOpened = false;
  }

  onAppBarRobotCellClick(robot:Robot){
    console.log(robot);
  }

  onAppBarApplicationCellClick(application:Application){
    //this.userSessionService.selectApplication(null);
    this.router.navigate(['icub']);
  }

  onAppBarButtonClick(){
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  ngOnInit(): void {
    this.appState.updateRobots();
  }

}
