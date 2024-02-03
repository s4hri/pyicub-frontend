import { Component,OnInit } from '@angular/core';
import {Robot} from "./types/Robot";
import {Router} from "@angular/router";
import {Application} from "./types/Application";
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  isDrawerOpened:boolean = false;
  robots$ = this.appState.availableRobots$;
  isLoadingRobots$ = this.appState.isLoadingRobots$;
  selectedRobot$ = this.appState.selectedRobot$;

  constructor(private appState:AppStateService, public router:Router){}

  onReloadButtonClick(){
    this.appState.updateRobots();
  }

  onDrawerCellClick(robot:Robot){

    if(!this.appState.selectedRobot || this.appState.selectedRobot.name !== robot.name){
      this.appState.selectRobot(robot);
    }

    if(this.router.url !== '/icub'){
      this.router.navigate(['icub']);
    }

    this.isDrawerOpened = false;
  }

  onAppBarRobotCellClick(robot:Robot){
    console.log(robot);
  }

  onAppBarApplicationCellClick(application:Application){
    this.appState.selectedRobot.selectedApplication = undefined;
    this.router.navigate(['icub']);
  }

  onAppBarButtonClick(){
    this.isDrawerOpened = !this.isDrawerOpened;
  }

}
