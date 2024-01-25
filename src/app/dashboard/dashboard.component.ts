import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridType} from "angular-gridster2";
import {Plugin} from "../types/Plugin";
import {FSM} from "../types/FSM";
import {FSMWidgetComponent} from "../fsmwidget/fsmwidget.component";
import {Application} from "../types/Application";
import {interval} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  options: GridsterConfig;

  @Input()
  application:Application

  @Input()
  set editModeEnabed(value: boolean) {

  }



  constructor(private cdRef: ChangeDetectorRef) {
  }

  itemChange(item,itemComponent){
    if (item.id === 'fsm') {
      console.log("FSM CHANGE")
      this.application.fsm.width = itemComponent.width;
      this.application.fsm.height = itemComponent.height;
      this.application.fsm.x = itemComponent.$item.x;
      this.application.fsm.y = itemComponent.$item.y;
      this.application.fsm.cols = itemComponent.$item.cols;
      this.application.fsm.rows = itemComponent.$item.rows;
    } else {
      let pluginIndex = this.application.plugins.findIndex(plugin => plugin.id == item.id)
      this.application.plugins[pluginIndex].x = itemComponent.$item.x
      this.application.plugins[pluginIndex].y = itemComponent.$item.y
      this.application.plugins[pluginIndex].cols = itemComponent.$item.cols
      this.application.plugins[pluginIndex].rows = itemComponent.$item.rows
      console.log("item change",item)
    }
    this.cdRef.detectChanges()
  }

  itemInit(item,itemComponent){
    if(item.id === 'fsm'){
      console.log("FSM INIT")

      //attendo,fino a un massimo di 2 secondi, che width ed height dell'item siano stati inizializzati dal framework, che purtoppo non fornisce callback a tale scopo.
      let intervalID = setInterval(() =>{
        if(itemComponent.width && itemComponent.height){
          this.application.fsm.width = itemComponent.width;
          this.application.fsm.height = itemComponent.height;
          clearInterval(intervalID);
        }
      },50)
      setTimeout(() => {
        clearInterval(intervalID);
      },2000)

    }
    this.cdRef.detectChanges()
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.OnDragAndResize,
      itemChangeCallback: this.itemChange.bind(this),
      itemInitCallback: this.itemInit.bind(this),
      draggable: {
        enabled: true,
        ignoreContent:true,
        dragHandleClass: 'drag-handler'
      },
      resizable: {
        enabled: true
      },
      swapWhileDragging:false,
      swap:false,
      pushItems:false,
      minCols: 100,
      maxCols: 100,
      minRows: 100,
      maxRows: 100,
      maxItemCols:100,
      maxItemRows:100,
      maxItemArea:100000
    };
  }

}
