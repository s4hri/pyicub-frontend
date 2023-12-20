import {Compiler, Component, ComponentFactoryResolver} from '@angular/core';
import {PluginService} from "../services/plugin.service";
import {Plugin} from "../plugin";

@Component({
  selector: 'app-plugin-manager',
  templateUrl: './plugin-manager.component.html',
  styleUrl: './plugin-manager.component.css'
})
export class PluginManagerComponent {

  plugins$ = this.pluginService.plugins$;

  onToggleClick(plugin:Plugin){
    this.pluginService.togglePlugin(plugin.name);
  }
  constructor(private pluginService:PluginService,private compiler:Compiler) {
  }

}
