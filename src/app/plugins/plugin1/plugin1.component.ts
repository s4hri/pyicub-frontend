import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {InputNode} from "../../graphy/models/input-node.model";
import {InputEdge} from "../../graphy/models/input-edge.model";
import {NodeStatus} from "../../types/FSM";
import {GraphyComponent} from "../../graphy/graphy.component";
import {forkJoin} from "rxjs";

interface nodeData {
  name: string,
  state: NodeStatus
}

@Component({
  selector: 'app-plugin1',
  templateUrl: './plugin1.component.html',
  styleUrl: './plugin1.component.css'
})
export class Plugin1Component extends WidgetBaseComponent implements OnInit {

  constructor(private cdr:ChangeDetectorRef){
    super();
  }

  private _graphy: GraphyComponent<any, any>;
  @ViewChild(GraphyComponent)
  set graphy(value: GraphyComponent<any, any>) {
    this._graphy = value;
    if(this._graphy && this.currentNodeID) {
      console.log("SETFOCUS")
      this._graphy.setFocusToNode(this.currentNodeID);

    }
  }

  get graphy(): GraphyComponent<any, any> {
    return this._graphy;
  }

  nodeColors = {
    INACTIVE: 'gray',
    ACTIVE: 'white',
    RUNNING: 'yellow',
    FAILED: 'red',
    CURRENT: 'white',
    DONE: 'green'
  }

  isLoading = true

  nodes: InputNode<nodeData>[] = []
  edges: InputEdge[] = []
  currentNodeID: string


  //il nodo con id init non effettua azioni vere e proprie ed è presente solo per compatibilità col framework utilizzato dal backend.
  //questa variabile contiene il vero nodo iniziale
  startingNodeID: string = undefined
  //conterrà gli ID di tutti i nodi collegati ad init. Questi nodi dovranno inviare in automatico il trigger di reset e start per far ripartire l'fsm.
  terminalNodesID: string[] = []

  ngOnInit() {

    forkJoin({
      fsm: this.getApplicationFSM(),
      currentStateName: this.fsmGetCurrentState()
    }).subscribe(({fsm, currentStateName}) => {

      let inputEdges = fsm.edges.map(edge => {
        const inputEdge: InputEdge = {
          sourceId: edge.sourceID,
          targetId: edge.targetID
        }
        return inputEdge
      })

      let inputNodes = fsm.nodes.map(node => {
        const inputNode: InputNode<nodeData> = {
          id: node.id,
          data: {
            name: node.name,
            state: NodeStatus.INACTIVE
          }
        }
        return inputNode
      })

      //rimuovo il nodo "init" e sostituisco tutti i suoi collegamenti con quelli del vero nodo iniziale
      inputNodes = inputNodes.filter(node => node.id !== "init");
      const startingEdge = inputEdges.find(edge => edge.sourceId === "init");
      const startingNodeIndex = inputNodes.findIndex(node => node.id === startingEdge.targetId)
      const startingNode = inputNodes[startingNodeIndex]
      const temp = inputNodes[0]
      inputNodes[0] = startingNode;
      inputNodes[startingNodeIndex] = temp;


      inputEdges = inputEdges.filter(edge => edge.sourceId !== "init");
      inputEdges.forEach(edge => {
        if (edge.targetId === "init") {
          edge.targetId = startingNode.id;
          this.terminalNodesID.push(edge.sourceId);
        }
      })

      this.nodes = inputNodes;
      this.edges = inputEdges;
      this.startingNodeID = startingNode.id;

      if(currentStateName === "init"){
        let startingNode = this.getNodeByID(this.startingNodeID);
        startingNode.data.state = NodeStatus.ACTIVE;
        this.currentNodeID = this.startingNodeID;
      } else {
        this.currentNodeID = currentStateName;
        const reachableNodes = this.findReachableNodes(currentStateName);
        for(let node of reachableNodes){
          node.data.state = NodeStatus.ACTIVE;
        }
      }

      this.isLoading = false;

    })

  }

  onNodeClick(node: InputNode<nodeData>) {
    this.nodes = this.nodes.map(thisNode => {
      if(thisNode.id === node.id){
        return {id:thisNode.id,data:{...thisNode.data,state:NodeStatus.RUNNING}}
      }
      return thisNode
    })

    setTimeout(() => {
      const reachableNodes = this.findReachableNodes(node.id).map(node => node.id)
      this.nodes = this.nodes.map(thisnode => {
        if(thisnode.id === node.id){
          return {id:thisnode.id,data:{...thisnode.data,state:NodeStatus.DONE}}
        }else if(reachableNodes.includes(thisnode.id)){
          return {id:thisnode.id,data:{...thisnode.data,state:NodeStatus.ACTIVE}}
        }
        return thisnode

      })
    },3000)


    console.log("SECOND SET FOCUS")
    this.graphy.setFocusToNode(node.id)

  }

  private getNodeByID(nodeID: string): InputNode<nodeData> {
    return this.nodes.find(node => node.id === nodeID)
  }

  private findReachableNodes(nodeID: string): InputNode<nodeData>[] {
    let reachableNodes = [];
    this.edges.forEach(edge => {
      if (edge.sourceId === nodeID) {
        const reachableNode = this.getNodeByID(edge.targetId)
        reachableNodes.push(reachableNode);
      }
    })
    return reachableNodes;
  }


  protected readonly NodeStatus = NodeStatus;

}

