import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../widget-base/widget-base.component";
import {Subject} from "rxjs";
import {GraphComponent} from "@swimlane/ngx-graph";
import {NodeStatus} from "../types/FSM";
import {AppStateService} from "../services/app-state.service";
import {InputNode} from "../graphy/models/input-node.model";
import {InputEdge} from "../graphy/models/input-edge.model";

@Component({
  selector: 'app-fsmwidget-prova',
  templateUrl: './fsmwidget-prova.component.html',
  styleUrl: './fsmwidget-prova.component.css'
})
export class FSMWidgetProvaComponent extends WidgetBaseComponent implements OnInit{
  nodeColors = {
    INACTIVE:'gray',
    ACTIVE:'white',
    RUNNING:'yellow',
    FAILED:'red',
    CURRENT:'white',
    DONE:'green'
  }

  initNodePosition={x:0,y:0}


  update$: Subject<boolean> = new Subject();

  currentNode:InputNode<{name:string,color:string,state:NodeStatus}> ;
  edges: InputEdge[] = []
  nodes:InputNode<{name:string,color:string,state:NodeStatus}>[] = [];

  ngOnInit() {
    /*
    let nodes = []
    let edges = []

    this.application.fsm.states.forEach(state => {
      nodes.push({
        id:state.stateName,
        label:state.stateName,
        color:'white',
        state:NodeStatus.INACTIVE,
      })

      for (let triggerName in state.triggers){
        edges.push({
          sourceId: state.stateName,
          targetId: state.triggers[triggerName],
        })

      }

    })

    this.nodes = nodes;
    this.edges = edges;

    this.currentNode = this.nodes.find(node => node.id === "init") || {id:"init",data:{name:"init",color:"white",state:NodeStatus.CURRENT}}
    this.currentNode.data.state = NodeStatus.CURRENT

    const runningState = this.application.fsm.states.find(state => state.stateName === "init")
    const triggers = runningState.triggers
    for(let trigger in triggers){
      let node = this.nodes.find(node => node.id === triggers[trigger])
      node.data.state = NodeStatus.ACTIVE
    }

     */

  }

  ngAfterViewInit() {
    /*
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

     */

  }

  //trascina il grafico orizzontalmente in modo che sia centrato sul nodo


  onNodeClick(node:InputNode<{name:string,color:string,state:NodeStatus}>){
    /*
    const runningState = this.application.fsm.states.find(state => state.stateName === this.currentNode.id)
    const [trigger,destination] = Object.entries(runningState.triggers).find(([key,value]) => value === node.id)
    this.currentNode.data.state = NodeStatus.INACTIVE
    this.currentNode = node
    this.currentNode.data.state = NodeStatus.CURRENT

    //this.panToNodeX(node)


    this.fsmRunStep(trigger).subscribe(requestID => {

      const onRunningCallback = () => {
        node.data.color = 'yellow';
        node.data.state = NodeStatus.RUNNING
      }

      const onDoneCallback = () => {
        node.data.state = NodeStatus.DONE
        let triggers = this.application.fsm.states.find(state => state.stateName === node.id).triggers;
        for(let trigger in triggers){
          let node = this.nodes.find(node => node.id === triggers[trigger])
          if(node.id === "init"){
            //this.panToNodeX(node)
          }
          node.data.state = NodeStatus.ACTIVE
        }
      }

      const onFailedCallback = () => {
        node.data.state = NodeStatus.FAILED
        let triggers = this.application.fsm.states.find(state => state.stateName === node.id).triggers;
        for(let trigger in triggers){
          let node = this.nodes.find(node => node.id === triggers[trigger])
          node.data.state = NodeStatus.ACTIVE
        }
      }

      this.checkAsyncRequestStatus(requestID,() => {}, onRunningCallback,onDoneCallback,onFailedCallback)
    })

     */

  }

  protected readonly NodeStatus = NodeStatus;
}




