import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  ComponentRef,
  ElementRef,
  AfterContentInit
} from '@angular/core';
import {GridsterConfig, GridType, DisplayGrid, GridsterItem, GridsterItemComponent} from 'angular-gridster2';
import {PluginService} from "../services/plugin.service";
import {map, Subject} from "rxjs";
import {ApiService} from "../api/api.service";
import {FSMWidgetComponent} from "../fsmwidget/fsmwidget.component";
import {UserSessionService} from "../user-session.service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  @ViewChild('fsmitem', {read: ElementRef})
  fsmItem:ElementRef

  @ViewChild(FSMWidgetComponent)
  fsm:FSMWidgetComponent

  fsmObject = [
    {
      "stateName": "Nome primo stato",
      "action": "foo",
      "triggers": {
        "a": "Nome secondo stato",
        "b": "Nome terzo stato"
      }
    },
    {
      "stateName": "Nome secondo stato",
      "action": "foo",
      "triggers": {
        "a": "Nome quarto stato"
      }
    },
    {
      "stateName": "Nome terzo stato",
      "action": "foo",
      "triggers": {
        "a": "Nome quinto stato"
      }
    },
    {
      "stateName": "Nome quarto stato",
      "action": "foo"
    },
    {
      "stateName": "Nome quinto stato",
      "action": "foo"
    }
  ]

  options: GridsterConfig;
  enabledPlugins$ = this.pluginsService.plugins$.pipe(
    map(plugins => plugins.filter(plugin => plugin.enabled))
  )

  appName = this.userSession.selectedApplication.name
  robotName = this.userSession.selectedRobot.name

  constructor(public pluginsService:PluginService,private userSession:UserSessionService,public apiService:ApiService) {}

  onItemResize(item, itemComponent) {
    if (item.id === 'fsm') {
      console.log("Resize fsm!")
      console.log("width:",this.fsmItem.nativeElement.clientWidth)
      console.log("height:",this.fsmItem.nativeElement.clientHeight)
      this.fsm.width = this.fsmItem.nativeElement.clientWidth;
      this.fsm.height = this.fsmItem.nativeElement.clientHeight;
      //this.fsm.fitGraph()
      //this.fsm.centerGraph()
    }
  }



  ngOnInit(): void {

    //this.apiService.runServiceAsync('icubSim','myRESTApp','foo',{},() => {console.log("INIT CALLBACK!")},() => {console.log("RUNNING CALLBACK!")},() => {console.log("DONE CALLBACK!!")}, () => {console.log("FAILED CALLBACK!!")})
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.OnDragAndResize,
      itemResizeCallback: this.onItemResize.bind(this),
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

  }

  onStateClick(){
    console.log("state click")
  }

}
