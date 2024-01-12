import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../widget-base/widget-base.component";
import {Subject} from "rxjs";
import {GraphComponent} from "@swimlane/ngx-graph";
import {FSM} from "../types/FSM";

@Component({
  selector: 'app-fsmwidget',
  templateUrl: './fsmwidget.component.html',
  styleUrl: './fsmwidget.component.css'
})
export class FSMWidgetComponent extends WidgetBaseComponent implements OnInit{

  @ViewChild(GraphComponent)
  graph:GraphComponent

  @Input()
  fsm:FSM

  activeNodes:string[] = [];
  runningNode:string = '';

  width:number
  height:number

  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  update$: Subject<boolean> = new Subject();
  panToNode$:Subject<string> = new Subject();

  links = [];
  nodes = [];

  ngOnInit() {
    let nodes = []
    let links = []
    this.fsm.forEach(state => {
      nodes.push({
        id:state.stateName,
        label:state.stateName,
        color:'white',
        action:state.action
      })

      for (let triggerName in state.triggers){
        links.push({
          id:triggerName,
          source: state.stateName,
          target: state.triggers[triggerName],
        })

      }

    })

    this.nodes = nodes;
    this.links = links;
    this.activeNodes.push('Nome primo stato')
  }

  /*
    links = [
      {
        id: 'a',
        source: 'init',
        target: 'second',
        label: 'is parent of'
      }, {
        id: 'b',
        source: 'init',
        target: 'third',
        label: 'custom label'
      },
      {
        id: 'c',
        source: 'second',
        target: 'fourth',
        label: 'is parent of'
      }, {
        id: 'd',
        source: 'third',
        target: 'fifth',
        label: 'custom label'
      },
    ]

    nodes = [
      {
        id: 'init',
        label: 'Nome primo stato',
        color:"white",
        action: ""
      }, {
        id: 'second',
        label: 'Nome secondo stato',
        color:"white",
        action: ""
      }, {
        id: 'third',
        label: 'Nome terzo stato',
        color:"white",
        action: ""
      }, {
        id: 'fourth',
        label: 'Nome quarto stato',
        color:"white",
        action: ""
      }, {
        id: 'fifth',
        label: 'Nome quinto stato',
        color:"white",
        action: ""
      }, {
        id: 'sixth',
        label: 'Nome sesto stato',
        color:"white",
        action: ""
      }
    ]

   */

  fitGraph() {
    this.zoomToFit$.next(true)
  }

  centerGraph(){
    this.center$.next(true)
  }

  updateGraph() {
    this.update$.next(true)
  }

  panToNode(nodeID:string){
    this.panToNode$.next(nodeID)
  }

  onNodeClick(node){
    //console.log(node)
    //console.log(this.graph)
    this.graph.panTo(node.position.x + this.graph.width/3,node.position.y)
    this.activeNodes = [];
    this.runningNode = node.id;
    let triggers = this.fsm.find(state => state.stateName === node.id)['triggers']
    let nodesToActivate:string[] = [];
    for(let trigger in triggers){
      nodesToActivate.push(triggers[trigger])
    }

    this.runServiceAsync(node.action,{},() =>{},() => {node.color = 'yellow'},() => {node.color = 'green'; this.activeNodes = nodesToActivate})

  }



}
