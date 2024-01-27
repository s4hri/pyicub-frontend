import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {InputNode} from "../../graphy/models/input-node.model";
import {InputEdge} from "../../graphy/models/input-edge.model";
import {NodeStatus} from "../../types/FSM";

@Component({
  selector: 'app-plugin1',
  templateUrl: './plugin1.component.html',
  styleUrl: './plugin1.component.css'
})
export class Plugin1Component extends WidgetBaseComponent implements OnDestroy,OnChanges{

  nodeColors = {
    INACTIVE:'gray',
    ACTIVE:'white',
    RUNNING:'yellow',
    FAILED:'red',
    CURRENT:'white',
    DONE:'green'
  }

  nodes:InputNode<{name:string,color:string,state:NodeStatus}>[]  = [
    { id: '1', data: { name: 'Carl',color:"white",state:NodeStatus.ACTIVE } },
    { id: '2', data: { name: 'Robin',color:"white",state:NodeStatus.INACTIVE  } },
    { id: '3', data: { name: 'Jeremy',color:"white",state:NodeStatus.RUNNING  } },
  ];

  edges: InputEdge[] = [
    { sourceId: '1', targetId: '2', },
    { sourceId: '2', targetId: '3', },
    { sourceId: '3', targetId: '1', }
  ];

  onNodeClick(node:InputNode<{name:string,color:string,state:NodeStatus}>){
    console.log(node)
  }

  protected readonly NodeStatus = NodeStatus;

  override ngOnDestroy() {
    super.ngOnDestroy();
    console.log("PLUGIN DESTROY")
  }

  ngOnChanges() {
    console.log("ONCHANGES",this.width,this.height)
  }
}

