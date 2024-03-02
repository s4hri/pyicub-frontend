import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";
import {MatDialog} from "@angular/material/dialog";
import {PluginDialogComponent} from "../plugin-dialog/plugin-dialog.component";
import {ApplicationArgsDialogComponent} from "../application-args-dialog/application-args-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Application} from "../types/Application";
import {SavedDashboardDialogComponent} from "../saved-dashboard-dialog/saved-dashboard-dialog.component";
import {RestoreSessionDialogComponent} from "../restore-session-dialog/restore-session-dialog.component";
import {SessionStorageService} from "../services/session-storage.service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  application:Application;
  isApplicationConfigured = false;
  editModeEnabled = false;

  constructor(private route:ActivatedRoute, private router:Router, public appState:AppStateService,public dialog: MatDialog,private changeDec:ChangeDetectorRef, private sessionStorage:SessionStorageService) {}

  openSettingsDialog() {
    const dialogRef = this.dialog.open(PluginDialogComponent, {
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true //evita che il dialog si chiuda cliccando all'esterno del suo frame
    });
  }

  toggleEditMode(){
    this.editModeEnabled = !this.editModeEnabled;
  }

  openArgsDialog(){
    const dialogRef = this.dialog.open(ApplicationArgsDialogComponent,{
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(args => {
      this.appState.configureApplication(this.application,args).subscribe(() => {
        this.isApplicationConfigured = true;
      })
    })
  }

  openRestoreSessionDialog(){
    const dialogRef = this.dialog.open(RestoreSessionDialogComponent,{
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(shouldRestore => {

      if(!shouldRestore){
        this.application.args = {};
        this.sessionStorage.saveApplicationArgs(this.application.robotName,this.application.name,{})
        this.openArgsDialog()
      } else {
        this.isApplicationConfigured = true;
      }

    })

  }

  openSavedDashboardDialog(){
    const dialogRef = this.dialog.open(SavedDashboardDialogComponent)
  }

  onClick(){
    this.openSettingsDialog()
  }

  onSaveClick(){
    this.appState.saveDashboardConfig(this.application)
    this.openSavedDashboardDialog()
    console.log("Dashboard salvata")
  }

  onPluginToggle(plugin:Plugin){
    this.appState.selectedRobot.selectedApplication.togglePlugin(plugin)
  }

  ngOnInit() {
    this.appState.availableRobots$.subscribe(robots => {
      if(robots){
        this.route.paramMap.subscribe(params => {
          const robotName = params.get('robotName');
          const appName = params.get('appName');
          //se i parametri inseriti non corrispondono a nessuna coppia robot-applicazione reindirizzo alla HomePage
          let selectedRobot = robots.find(robot => robot.name === robotName)

          if(!selectedRobot){
            this.router.navigate([''])
            console.log("Non è stata trovata un robot corrispondente a quello indicata. Reindirizzo in Homepage.")
            return
          }

          let selectedApplication = selectedRobot.applications.find(application => application.name === appName)

          if(!selectedApplication){
            this.router.navigate([''])
            console.log("Non è stata trovata un' applicazione corrispondente a quella indicata. Reindirizzo in Homepage.")
            return
          }

          if(!this.appState.selectedRobot || this.appState.selectedRobot.name !== robotName){
            this.appState.selectRobot(selectedRobot)
          }

          this.appState.selectApplication(selectedApplication)
          this.application = selectedApplication

          //Se gli argomenti non sono stati gia impostati dall'utente, mostro il dialog per settarli
          //quindi se argsTemplate non è vuoto e args lo è
          const argsTemplateExists = Object.keys(this.application.argsTemplate).length !== 0
          const areArgsSet = this.application.args && Object.keys(this.application.args).length !== 0

          if(!argsTemplateExists){
            this.isApplicationConfigured = true;
          }else if(!areArgsSet){
            this.openArgsDialog()
          } else {
            this.openRestoreSessionDialog()
          }

          //Il timeout senza durate serve per mettere l'evento in coda a tutte le altre attività asincrone
          setTimeout(() => {
            this.changeDec.detectChanges()
          })
        })

      }
    })

  }

}
