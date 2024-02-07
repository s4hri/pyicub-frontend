import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponent, GridType} from "angular-gridster2";
import {Application} from "../types/Application";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  options: GridsterConfig;

  itemsSize: { [key: string]: { width: number, height: number } } = {};

  @Input()
  application: Application

  @Input()
  set editModeEnabled(value: boolean) {
    if (value) {
      this.options.draggable = {
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'drag-handler'
      }
      this.options.resizable = {
        enabled: true
      }

    } else {

      this.options.draggable = {
        enabled: false
      }
      this.options.resizable = {
        enabled: false
      }

    }

    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }

  }

  constructor(private cdRef: ChangeDetectorRef) {
  }

  itemChange(item:GridsterItem, itemComponent:GridsterItemComponent) {
    let pluginIndex = this.application.plugins.findIndex(plugin => plugin.id == item['id'])
    this.application.plugins[pluginIndex].x = itemComponent.$item.x
    this.application.plugins[pluginIndex].y = itemComponent.$item.y
    this.application.plugins[pluginIndex].cols = itemComponent.$item.cols
    this.application.plugins[pluginIndex].rows = itemComponent.$item.rows
    this.itemsSize[item['id']] = {
      width: itemComponent.width,
      height: itemComponent.height
    }

    this.cdRef.detectChanges()
  }

  itemInit(item:GridsterItem, itemComponent:GridsterItemComponent) {

    let intervalID = setInterval(() => {
      if (itemComponent.width && itemComponent.height) {
        this.itemsSize[item['id']] = {
          width: itemComponent.width,
          height: itemComponent.height
        }
        clearInterval(intervalID);
      }
    }, 50)
    setTimeout(() => {
      clearInterval(intervalID);
    }, 2000)

    this.cdRef.detectChanges()
  }

  ngOnInit(): void {

    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.OnDragAndResize,
      itemChangeCallback: this.itemChange.bind(this),
      itemInitCallback: this.itemInit.bind(this),
      draggable: {
        enabled: false,
        ignoreContent: true,
        dragHandleClass: 'drag-handler'
      },
      resizable: {
        enabled: false
      },
      swapWhileDragging: false,
      swap: false,
      pushItems: false,
      mobileBreakpoint:599.98,
      minCols: 100,
      maxCols: 100,
      minRows: 100,
      maxRows: 100,
      maxItemCols: 100,
      maxItemRows: 100,
      maxItemArea: 100000,
    };
  }

}
