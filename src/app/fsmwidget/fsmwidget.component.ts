import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../widget-base/widget-base.component";
import {Subject} from "rxjs";
import {GraphComponent} from "@swimlane/ngx-graph";
import {NodeStatus} from "../types/FSM";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-fsmwidget',
  templateUrl: './fsmwidget.component.html',
  styleUrl: './fsmwidget.component.css'
})
export class FSMWidgetComponent extends WidgetBaseComponent implements OnInit,AfterViewInit{

  nodeColors = {
    INACTIVE:'gray',
    ACTIVE:'white',
    RUNNING:'yellow',
    FAILED:'red',
    CURRENT:'white',
    DONE:'green'
  }

  initNodePosition={x:0,y:0}

  @ViewChild(GraphComponent)
  graph:GraphComponent

  update$: Subject<boolean> = new Subject();

  currentNode:any;
  links = [];
  nodes = [];

  ngOnInit() {
    let nodes = []
    let links = []

    this.application.fsm.states.forEach(state => {
      nodes.push({
        id:state.stateName,
        label:state.stateName,
        color:'white',
        state:NodeStatus.INACTIVE,
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

    this.currentNode = this.nodes.find(node => node.id === "init")
    this.currentNode.state = NodeStatus.CURRENT

    const runningState = this.application.fsm.states.find(state => state.stateName === "init")
    const triggers = runningState.triggers
    for(let trigger in triggers){
      let node = this.nodes.find(node => node.id === triggers[trigger])
      node.state = NodeStatus.ACTIVE
    }

  }

  updateGraph(){
    this.update$.next(true)
  }

  ngAfterViewInit() {
    let initNode = this.nodes.find(node => node.id === 'init')

    //Attendo,fino a un massimo di 2 secondi, che il framework abbia inizializzato la posizione dei nodi, in modo da trascinare il grafico sul nodo iniziale.
    let intervalID = setInterval(() =>{
      if(initNode.position.x !== 0 && initNode.position.x !== 0){
        this.graph.panTo(initNode.position.x + this.graph.graphDims.width / 2,initNode.position.y)
        this.initNodePosition.x = initNode.position.x;
        this.initNodePosition.y = initNode.position.y;
        clearInterval(intervalID);
      }
    },50)
    setTimeout(() => {
      clearInterval(intervalID);
    },2000)

  }

  //trascina il grafico orizzontalmente in modo che sia centrato sul nodo
  private panToNodeX(node){
    this.graph.panTo(node.position.x,this.initNodePosition.y)
    this.updateGraph()
  }

  onNodeClick(node){
    const runningState = this.application.fsm.states.find(state => state.stateName === this.currentNode.id)
    const [trigger,destination] = Object.entries(runningState.triggers).find(([key,value]) => value === node.id)
    this.currentNode.state = NodeStatus.INACTIVE
    this.currentNode = node
    this.currentNode.state = NodeStatus.CURRENT

    this.panToNodeX(node)


    this.fsmRunStep(trigger).subscribe(requestID => {

      const onRunningCallback = () => {
        node.color = 'yellow';
        node.state = NodeStatus.RUNNING
      }

      const onDoneCallback = () => {
        node.state = NodeStatus.DONE
        let triggers = this.application.fsm.states.find(state => state.stateName === node.id).triggers;
        for(let trigger in triggers){
          let node = this.nodes.find(node => node.id === triggers[trigger])
          if(node.id === "init"){
            this.panToNodeX(node)
          }
          node.state = NodeStatus.ACTIVE
        }
      }

      const onFailedCallback = () => {
        node.state = NodeStatus.FAILED
        let triggers = this.application.fsm.states.find(state => state.stateName === node.id).triggers;
        for(let trigger in triggers){
          let node = this.nodes.find(node => node.id === triggers[trigger])
          node.state = NodeStatus.ACTIVE
        }
      }

      this.checkAsyncRequestStatus(requestID,() => {}, onRunningCallback,onDoneCallback,onFailedCallback)
    })

  }

  protected readonly NodeStatus = NodeStatus;
}
