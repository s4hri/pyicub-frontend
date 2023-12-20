import { Injectable } from '@angular/core';
import {Plugin} from "../plugin";
import {BehaviorSubject, Observable} from "rxjs";
import {pluginIndex} from "../plugins";

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  pluginMap = pluginIndex;
  private readonly _plugins:BehaviorSubject<Plugin[]>;
  readonly plugins$:Observable<Plugin[]>;

  get plugins(): Plugin[] {
    return this._plugins.getValue();
  }

  private set plugins(val: Plugin[]) {
    this._plugins.next(val);
  }

  enablePlugin(pluginName:string){

    const updatedPluginList = this.plugins.map(plugin => {
      if (plugin.name === pluginName){
        return {...plugin,enabled:true};
      }
      return plugin;
    })

    this.plugins = updatedPluginList;
  }

  disablePlugin(pluginName:string){

    const updatedPluginList = this.plugins.map(plugin => {
      if (plugin.name === pluginName){
        return {...plugin,enabled:false};
      }
      return plugin;
    })

    this.plugins = updatedPluginList;
  }

  togglePlugin(pluginName:string){

    const updatedPluginList = this.plugins.map(plugin => {
      if (plugin.name === pluginName){
        return {...plugin,enabled:!plugin.enabled};
      }
      return plugin;
    })

    this.plugins = updatedPluginList;
  }

  getPluginComponent(pluginName:string){
    return this.pluginMap[pluginName]
  }

  constructor() {
    const initialPluginsList:Plugin[] = []

    for (const [pluginName, componentName] of Object.entries(pluginIndex)) {
      initialPluginsList.push(new Plugin(pluginName,false))

    }

    this._plugins = new BehaviorSubject<Plugin[]>(initialPluginsList);
    this.plugins$ = this._plugins.asObservable();
  }
}
