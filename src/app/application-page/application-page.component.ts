import {Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, ComponentRef} from '@angular/core';
import {GridsterConfig, GridType, DisplayGrid} from 'angular-gridster2';
import {PluginService} from "../services/plugin.service";
import {map} from "rxjs";
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  //@ViewChild('content', { read: ViewContainerRef })
  //content: ViewContainerRef;

  options: GridsterConfig;
  dashboard: Array<any>;
  enabledPlugins$ = this.pluginsService.plugins$.pipe(
    map(plugins => plugins.filter(plugin => plugin.enabled))
  )

  constructor(public pluginsService:PluginService,public apiService:ApiService) {}

  ngOnInit(): void {
    this.apiService.runServiceAsync('icubSim','myRESTApp','foo',{},() => {console.log("INIT CALLBACK!")},() => {console.log("RUNNING CALLBACK!")},() => {console.log("DONE CALLBACK!!")}, () => {console.log("FAILED CALLBACK!!")})
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.OnDragAndResize,
      draggable: {
        enabled: true,
        ignoreContent:true,
        dragHandleClass: 'drag-handler'
      },
      resizable: {
        enabled: true
      },
      swapWhileDragging:true,
      pushItems:true,
      minCols: 100,
      maxCols: 100,
      minRows: 100,
      maxRows: 100,
      maxItemCols:100,
      maxItemRows:100,
      maxItemArea:100000
    };

    this.dashboard = [
      { cols: 30, rows: 15, y: 0, x: 0 },
      { cols: 30, rows: 30, y: 0, x: 2 }
      // altri elementi della griglia...
    ];

  }

}
