import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../widget-base/widget-base.component";
import {Subject} from "rxjs";
import {GraphComponent} from "@swimlane/ngx-graph";
import {FSM} from "../types/FSM";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-fsmwidget',
  templateUrl: './fsmwidget.component.html',
  styleUrl: './fsmwidget.component.css'
})
export class FSMWidgetComponent extends WidgetBaseComponent implements OnInit,AfterViewInit{

  constructor(private changeDec:ChangeDetectorRef,private appData:AppStateService) {
    super();
  }

  @ViewChild(GraphComponent)
  graph:GraphComponent

  @Input()
  fsm:FSM

  activeNodes:string[] = [];
  runningNode:string = '';

  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  update$: Subject<boolean> = new Subject();
  panToNode$:Subject<string> = new Subject();

  links = [];
  nodes = [];

  ngOnInit() {
    let nodes = []
    let links = []
    this.fsm.states.forEach(state => {
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

  ngAfterViewInit() {
    let initNode = this.nodes.find(node => node.id === 'Nome primo stato')
    setTimeout(() => {
      console.log(initNode.dimension)
      this.graph.panTo(initNode.position.x + initNode.dimension.width ,initNode.position.y)
    },100)

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

  center(){
    let minX = 100000000000;
    let minY = 100000000000;
    let maxX = 0;
    let maxY = 0;
    for (let i = 0; i < this.graph.nodes.length; i++) {
      const node = this.graph.nodes[i];
      let halfWidth = node.dimension.width / 2;
      let halfHeight = node.dimension.height / 2;
      minX = node.position.x - halfWidth < minX ? node.position.x - halfWidth : minX;
      minY = node.position.y - halfHeight < minY ? node.position.y - halfHeight : minY;
      maxX = node.position.x + halfWidth > maxX ? node.position.x + halfWidth : maxX;
      maxY = node.position.y + halfHeight > maxY ? node.position.y + halfHeight : maxY;
    }

    this.graph.panTo(minX + this.graph.graphDims.width / 2, minY + this.graph.graphDims.height / 2);
  }

  updateGraph() {
    this.update$.next(true)
  }

  panToNode(nodeID:string){
    this.panToNode$.next(nodeID)
  }

  onNodeClick(node){
    //this.center();
    console.log("GRAPH",this.graph)
    console.log(node.position)
    this.appData.saveData();
    //console.log(node)
    //console.log(this.graph)
    /*
    this.graph.panTo(node.position.x + this.graph.width/3,node.position.y)
    this.activeNodes = [];
    this.runningNode = node.id;
    let triggers = this.fsm.states.find(state => state.stateName === node.id)['triggers']
    let nodesToActivate:string[] = [];
    for(let trigger in triggers){
      nodesToActivate.push(triggers[trigger])
    }

    this.runServiceAsync(node.action,{},() =>{},() => {node.color = 'yellow'},() => {node.color = 'green'; this.activeNodes = nodesToActivate})
    */
  }



}
