import {Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, ComponentRef} from '@angular/core';
import {GridsterConfig, GridType, DisplayGrid} from 'angular-gridster2';
import {PluginService} from "../services/plugin.service";
import {map} from "rxjs";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements AfterViewInit,OnInit{

  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;
  private componentRefs = new Map<string, ComponentRef<any>>();
  private prevComponentsRefs = new Map<string, ComponentRef<any>>();

  options: GridsterConfig;
  dashboard: Array<any>;
  enabledPlugins$ = this.pluginsService.plugins$.pipe(
    map(plugins => plugins.filter(plugin => plugin.enabled))
  )

  constructor(public pluginsService:PluginService) {}

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.options.api.optionsChanged()
    //this.pluginsService.plugins$.subscribe(plugins => {

      //this.content.clear()
      //plugins.forEach(plugin => {
        //if(plugin.enabled){
          //const ref = this.content.createComponent(PluginWidgetContainerComponent)
          //ref.setInput('widget',this.pluginsService.pluginMap[plugin.name])
        //}
      //})
    //})
  }

}
