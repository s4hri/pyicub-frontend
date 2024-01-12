import {Compiler, Component, ComponentFactoryResolver} from '@angular/core';
import {PluginService} from "../services/plugin.service";
import {Plugin} from "../types/Plugin";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-plugin-manager',
  templateUrl: './plugin-manager.component.html',
  styleUrl: './plugin-manager.component.css'
})
export class PluginManagerComponent {

  plugins$ = new BehaviorSubject(undefined)
  //plugins$ = this.pluginService.plugins$;

  onToggleClick(plugin:Plugin){
    //this.pluginService.togglePlugin(plugin.name);
  }
  constructor(private pluginService:PluginService,private compiler:Compiler) {
  }

}
