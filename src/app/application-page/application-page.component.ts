import {Component} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";
import {MatDialog} from "@angular/material/dialog";
import {PluginDialogComponent} from "../plugin-dialog/plugin-dialog.component";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent{

  plugins$ = this.appState.selectedRobot.selectedApplication.plugins$;
  application = this.appState.selectedRobot.selectedApplication

  constructor(public appState:AppStateService,public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PluginDialogComponent, {
      data: this.appState.selectedRobot.selectedApplication
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClick(){
    console.log("CLIIIIIICK")
    this.openDialog()
  }

  onPluginToggle(plugin:Plugin){
    this.appState.selectedRobot.selectedApplication.togglePlugin(plugin)
  }

}
