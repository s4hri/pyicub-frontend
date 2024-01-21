import { Component } from '@angular/core';
import {Application} from "../types/Application";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent{

  selectedRobot$ = this.appState.selectedRobot$;

  onApplicationClick(application:Application){
    this.appState.selectApplication(application);
    this.router.navigate(['icub/application']);
  }

  constructor(private appState:AppStateService,private router:Router) {}

}
