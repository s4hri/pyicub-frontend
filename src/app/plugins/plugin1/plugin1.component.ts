import {Component, OnInit} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";

@Component({
  selector: 'app-plugin1',
  templateUrl: './plugin1.component.html',
  styleUrl: './plugin1.component.css'
})
export class Plugin1Component extends WidgetBaseComponent implements OnInit{
  ngOnInit(): void {
    console.log("plugin1, appName: ",this.appName," robotName: ",this.robotName)
    this.getApplicationFSM().subscribe(response => {
      console.log(response)
    })
  }

}
