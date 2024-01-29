import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {InputNode} from "../../graphy/models/input-node.model";
import {InputEdge} from "../../graphy/models/input-edge.model";
import {FSMNode, NodeStatus} from "../../types/FSM";
import {GraphyComponent} from "../../graphy/graphy.component";
import {forkJoin} from "rxjs";

interface nodeData{
  name:string,
  color:string,
  state:NodeStatus
}
@Component({
  selector: 'app-plugin1',
  templateUrl: './plugin1.component.html',
  styleUrl: './plugin1.component.css'
})
export class Plugin1Component extends WidgetBaseComponent implements OnInit{

  private _graphy: GraphyComponent<any, any>;
  @ViewChild(GraphyComponent)
  set graphy(value: GraphyComponent<any, any>) {
    this._graphy = value;
    if (this._graphy) {
      this.graphy.setFocusToNode(this.currentNode.id)
    }
  }
  get graphy(): GraphyComponent<any, any> {
    return this._graphy;
  }

  nodeColors = {
    INACTIVE:'gray',
    ACTIVE:'white',
    RUNNING:'yellow',
    FAILED:'red',
    CURRENT:'white',
    DONE:'green'
  }

  isLoading = true

  /*
  nodes:InputNode<{name:string,color:string,state:NodeStatus}>[]  = [
    { id: '1', data: { name: 'Carl',color:"white",state:NodeStatus.ACTIVE } },
    { id: '2', data: { name: 'Robin',color:"white",state:NodeStatus.ACTIVE  } },
    { id: '3', data: { name: 'Jeremy',color:"white",state:NodeStatus.ACTIVE  } },
    { id: '4', data: { name: 'Angela',color:"white",state:NodeStatus.ACTIVE  } },
    { id: '5', data: { name: 'Daniele',color:"white",state:NodeStatus.ACTIVE  } },
    { id: '6', data: { name: 'Fusky',color:"white",state:NodeStatus.ACTIVE  } },
    { id: '7', data: { name: 'Giovanna',color:"white",state:NodeStatus.ACTIVE  } },
  ];

  edges: InputEdge[] = [
    { sourceId: '1', targetId: '2', },
    { sourceId: '2', targetId: '3', },
    { sourceId: '2', targetId: '4', },
    { sourceId: '3', targetId: '5', },
    { sourceId: '4', targetId: '6', },
    { sourceId: '5', targetId: '7', },
    { sourceId: '6', targetId: '7', },
  ];
  */
  nodes:InputNode<nodeData>[] = []
  edges:InputEdge[] = []
  currentNode:InputNode<nodeData> = undefined

  ngOnInit() {

    forkJoin({
      fsm:this.getApplicationFSM(),
      currentStateName:this.fsmGetCurrentState()
    }).subscribe(({fsm,currentStateName}) =>{
      this.nodes = fsm.nodes.map(node => {
        const inputNode: InputNode<nodeData> = {
          id:node.id,
          data:{
            name:node.name,
            color:'white',
            state:NodeStatus.INACTIVE
          }
        }
        return inputNode
      })

      this.edges = fsm.edges.map(edge => {
        const inputEdge:InputEdge = {
          sourceId: edge.sourceID,
          targetId: edge.targetID
        }
        return inputEdge
      })

      this.currentNode = this.nodes.find(node => node.id === currentStateName)
      this.isLoading = false;

    })

  }


  onNodeClick(node:InputNode<{name:string,color:string,state:NodeStatus}>){
    console.log(node)
    this.graphy.setFocusToNode(node.id)

  }



  protected readonly NodeStatus = NodeStatus;

}

