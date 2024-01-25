import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";
import {MatDialog} from "@angular/material/dialog";
import {PluginDialogComponent} from "../plugin-dialog/plugin-dialog.component";
import {ApplicationArgsDialogComponent} from "../application-args-dialog/application-args-dialog.component";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  plugins$ = this.appState.selectedRobot.selectedApplication.plugins$;
  application = this.appState.selectedRobot.selectedApplication

  areApplicationArgsSet = false;
  editModeEnabled = false;

  constructor(public appState:AppStateService,public dialog: MatDialog) {}

  openSettingsDialog() {
    const dialogRef = this.dialog.open(PluginDialogComponent, {
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true //evita che il dialog si chiuda cliccando all'esterno del suo frame
    });
  }

  openArgsDialog(){
    const dialogRef = this.dialog.open(ApplicationArgsDialogComponent,{
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(args => {
      this.appState.setApplicationArgs(this.application,args).subscribe(() => {
        this.areApplicationArgsSet = true;
      })
    })
  }

  onClick(){
    console.log("CLIIIIIICK")
    this.openSettingsDialog()
  }

  onPluginToggle(plugin:Plugin){
    this.appState.selectedRobot.selectedApplication.togglePlugin(plugin)
  }

  ngOnInit() {
    //Se gli argomenti non sono stati gia impostati dall'utente, mostro il dialog per settarli
    //quindi se argsTemplate non è vuoto e args lo è
    const argsTemplateExists = Object.keys(this.application.argsTemplate).length !== 0
    const areArgsSet = this.application.args && Object.keys(this.application.args).length !== 0
    if( argsTemplateExists && !areArgsSet ){
      this.openArgsDialog()
    } else {
      this.areApplicationArgsSet = true
    }

  }

}
