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

  exportToJSON():string{
    let json:{[key:string]:any} = {};
    json["name"] = this.name
    json["enabled"] = this.enabled
    json["cols"] = this.cols
    json["rows"] = this.rows
    json["x"] = this.x
    json["y"] = this.y
    json["id"] = this.id

    return JSON.stringify(json)
  }

}
