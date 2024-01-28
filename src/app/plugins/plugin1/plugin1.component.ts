import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {InputNode} from "../../graphy/models/input-node.model";
import {InputEdge} from "../../graphy/models/input-edge.model";
import {NodeStatus} from "../../types/FSM";
import {GraphyComponent} from "../../graphy/graphy.component";

@Component({
  selector: 'app-plugin1',
  templateUrl: './plugin1.component.html',
  styleUrl: './plugin1.component.css'
})
export class Plugin1Component extends WidgetBaseComponent implements OnDestroy,OnChanges{

  private _graphy: GraphyComponent<any, any>;
  @ViewChild(GraphyComponent)
  set graphy(value: GraphyComponent<any, any>) {
    this._graphy = value;
    if (this._graphy) {
      this._graphy.center();
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
    console.log(this.graphy)
    this.graphy.center()
  }

  protected readonly NodeStatus = NodeStatus;

  override ngOnDestroy() {
    super.ngOnDestroy();
    console.log("PLUGIN DESTROY")
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    console.log(this.graphy)
  }

}

