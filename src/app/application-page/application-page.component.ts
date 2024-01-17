import {Component} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent{

  plugins$ = this.appState.selectedRobot.selectedApplication.plugins$;
  application = this.appState.selectedRobot.selectedApplication

  constructor(public appState:AppStateService) {}

  onPluginToggle(plugin:Plugin){
    this.appState.selectedRobot.selectedApplication.togglePlugin(plugin)
  }

}
