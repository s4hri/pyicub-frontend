import {DashboardItem} from "./DashboardItem";

export class Plugin implements DashboardItem{
  name:string
  enabled:boolean
  component:any

  constructor(name:string,component:any,enabled:boolean = false,cols:number,rows:number,x:number = 0, y:number = 0) {
    this.name = name;
    this.component = component;
    this.enabled = enabled;
    this.cols = cols;
    this.rows = rows;
    this.x = x;
    this.y = y;
    this.id = name;
  }

  togglePlugin(){
    this.enabled = !this.enabled
  }

  cols: number;
  rows: number;
  x: number;
  y: number;
  id:string;

}
