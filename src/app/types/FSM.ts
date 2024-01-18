import {DashboardItem} from "./DashboardItem";

export enum NodeStatus{
  INACTIVE,
  ACTIVE,
  RUNNING,
  DONE,
  FAILED
}

export class State {
  stateName: string;
  action: string;
  triggers: { [key: string]: string };

  constructor(stateName:string,triggers:{ [key: string]: string },action:string = "") {
    this.stateName = stateName;
    this.triggers = triggers
  }
}

export class FSM implements DashboardItem{
  cols: number;
  rows: number;
  width:number;
  height:number;
  x: number;
  y: number;
  id:string;

  states:State[]

  constructor(states:State[],cols:number = 50,rows:number = 50,width:number=0,height:number=0, x:number = 0, y:number = 0) {
    this.states = states;
    this.cols = cols;
    this.rows = rows;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.id = 'fsm'
  }

  exportToJSON():string{
    let json:{[key:string]:string} = {};
    return "fsm"
  }

}
