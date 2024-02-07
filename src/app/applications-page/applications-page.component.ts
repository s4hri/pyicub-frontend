import { Component } from '@angular/core';
import {Application} from "../types/Application";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent{

  //per eliminare il BreakpointObserver quando il componente è distrutto
  destroyed = new Subject<void>();
  selectedRobot$ = this.appState.selectedRobot$;
  gridColsNumber = 2;

  onApplicationClick(application:Application){
    this.appState.selectApplication(application);
    this.router.navigate(['icub/application']);
  }

  constructor(public appState:AppStateService,private router:Router,private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {

        const breakpoint = Object.keys(result.breakpoints).find( key =>{
          return result.breakpoints[key]
        })

        switch(breakpoint){
          case Breakpoints.XSmall:
            this.gridColsNumber = 2;
            break;
          case Breakpoints.Small:
            this.gridColsNumber = 2;
            break;
          case Breakpoints.Medium:
            this.gridColsNumber = 3;
            break;
          case Breakpoints.Large:
            this.gridColsNumber = 4;
            break;
          case Breakpoints.XLarge:
            this.gridColsNumber = 5;
            break;
        }

      })
  }
}
