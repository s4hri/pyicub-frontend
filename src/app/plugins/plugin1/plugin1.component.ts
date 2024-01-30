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

  private _graphy: GraphyComponent<any, any>;
  @ViewChild(GraphyComponent)
  set graphy(value: GraphyComponent<any, any>) {
    this._graphy = value;
    if(this._graphy && this.currentNodeID) {
      const nodeID = this.currentNodeID == "init" ? this.startingNode.nodeID : this.currentNodeID
      this._graphy.setFocusToNode(nodeID);
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
  startingNode: {nodeID:string,startTrigger:string} = undefined;
  //conterrà gli ID di tutti i nodi collegati ad init. Questi nodi dovranno inviare in automatico il trigger di reset e start per far ripartire l'fsm.
  terminalNodes: { nodeID:string,restartTrigger:string }[] = []

  ngOnInit() {

    forkJoin({
      fsm: this.getApplicationFSM(),
      currentStateName: this.fsmGetCurrentState()
    }).subscribe(({fsm, currentStateName}) => {

      let inputEdges = fsm.edges.map(edge => {
        const inputEdge: InputEdge = {
          id:edge.trigger,
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
      const startTrigger = startingEdge.id;
      const temp = inputNodes[0]
      inputNodes[0] = startingNode;
      inputNodes[startingNodeIndex] = temp;


      inputEdges = inputEdges.filter(edge => edge.sourceId !== "init");
      inputEdges.forEach(edge => {
        if (edge.targetId === "init") {
          edge.targetId = startingNode.id;
          const terminalNode = {nodeID:edge.sourceId,restartTrigger:edge.id}
          this.terminalNodes.push(terminalNode);
        }
      })

      this.nodes = inputNodes;
      this.edges = inputEdges;
      this.startingNode = {nodeID:startingNode.id,startTrigger:startTrigger}

      const terminalNode = this.terminalNodes.find(node => node.nodeID === currentStateName)
      if(currentStateName === "init"){

        let startingNode = this.getNodeByID(this.startingNode.nodeID);
        startingNode.data.state = NodeStatus.ACTIVE;
        this.currentNodeID = "init";
        this.isLoading = false

      } else if(terminalNode){
        this.fsmRunStep(terminalNode.restartTrigger).subscribe(reqID => {
          const onDoneRestart = () => {
            this.isLoading = false;
            this.currentNodeID = "init";
            const startingNode = this.getNodeByID(this.startingNode.nodeID)
            this.updateNodeState(startingNode,NodeStatus.ACTIVE)
          }
          this.checkAsyncRequestStatus(reqID,undefined,undefined,onDoneRestart)
        })
      } else {

        this.currentNodeID = currentStateName;
        const reachableNodes = this.findReachableNodes(currentStateName);
        for(let node of reachableNodes){
          node.data.state = NodeStatus.ACTIVE;
        }
        this.isLoading = false;
      }

    })

  }

  onNodeClick(selectedNode: InputNode<nodeData>) {
    if(selectedNode.data.state === NodeStatus.ACTIVE){
      this.runStep(selectedNode)
    }
  }

  private runStep(selectedNode:InputNode<nodeData>){

    let trigger:string

    if(selectedNode.id === this.startingNode.nodeID){
      trigger = this.startingNode.startTrigger;
    }else{
      const selectedEdge = this.edges.find(edge => edge.sourceId === this.currentNodeID && edge.targetId === selectedNode.id)
      trigger = selectedEdge.id;
    }

    if(this.currentNodeID !== "init"){
      const currentNode = this.getNodeByID(this.currentNodeID);
      this.updateNodeState(currentNode,NodeStatus.INACTIVE);
      const reachableNodes = this.findReachableNodes(currentNode.id);
      for(let reachableNode of reachableNodes){
        if(reachableNode.id !== selectedNode.id){
          this.updateNodeState(reachableNode,NodeStatus.INACTIVE);
        }
      }
    }

    this.currentNodeID = selectedNode.id
    this.graphy.setFocusToNode(selectedNode.id);

    this.fsmRunStep(trigger).subscribe(reqID => {

      const onRunning = () => {
        this.updateNodeState(selectedNode,NodeStatus.RUNNING)
      }

      const onDone = () => {
        //se è un nodo collegato ad "init" invia il trigger di restart
        const terminalNode = this.terminalNodes.find(node => node.nodeID === selectedNode.id)
        if(terminalNode){
          this.fsmRunStep(terminalNode.restartTrigger).subscribe(reqID => {

            const onRestartDone = () => {
              this.updateNodeState(selectedNode,NodeStatus.DONE)
              const reachableNodes = this.findReachableNodes(selectedNode.id)
              for(let reachableNode of reachableNodes){
                this.updateNodeState(reachableNode,NodeStatus.ACTIVE)
              }
            }
            this.checkAsyncRequestStatus(reqID,undefined,undefined,onRestartDone)
          })

        } else {

          this.updateNodeState(selectedNode,NodeStatus.DONE)
          const reachableNodes = this.findReachableNodes(selectedNode.id)
          console.log(`Reachable nodes from ${selectedNode.id}:`)
          console.log(reachableNodes)
          for(let reachableNode of reachableNodes){
            console.log(reachableNode.id, " ATTIVATO")
            this.updateNodeState(reachableNode,NodeStatus.ACTIVE)
          }
          this.graphy.setFocusToNode(selectedNode.id)
        }

      }

      const onFailed = () => {
        this.updateNodeState(selectedNode,NodeStatus.FAILED)
      }

      this.checkAsyncRequestStatus(reqID,undefined,onRunning,onDone,onFailed)

    })

  }

  /**Effettua un aggiornamento di stato immutabile modificando lo stato del nodo selezionato*/
  private updateNodeState(nodeToUpdate:InputNode<nodeData>,updatedState:NodeStatus){
    this.nodes = this.nodes.map(node => {
      if(node.id === nodeToUpdate.id){
        return {id:node.id,data:{...node.data,state:updatedState}}
      }
      return node
    })
  }

  private getNodeByID(nodeID: string): InputNode<nodeData> {
    return this.nodes.find(node => node.id === nodeID)
  }

  /**Restituisce un'array contenente tutti i nodi raggiungibili dal nodo avente id nodeID*/
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

