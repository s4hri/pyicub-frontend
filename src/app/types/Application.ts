import {Plugin} from "./Plugin";
import {BehaviorSubject, filter, map} from "rxjs";
import {FSM} from "./FSM";

export class Application{
  robotName:string
  name:string
  url:string
  description:string
  fsm:FSM

  private readonly _plugins = new BehaviorSubject<Plugin[]>([])
  readonly plugins$ = this._plugins.asObservable();
  readonly enabledPlugins$ = this.plugins$.pipe(
    map(plugins => plugins.filter(plugin => plugin.enabled))
  )
  get plugins():Plugin[]{
    return this._plugins.getValue();
  }
  private set plugins(val:Plugin[]){
    this._plugins.next(val);
  }

  togglePlugin(plugin:Plugin){
    let newPlugins = this.plugins.map(newPlugin => {
      if(plugin.name == newPlugin.name){
        newPlugin.togglePlugin()
        return newPlugin
      }
      return newPlugin
    })
    this.plugins = newPlugins;
  }

  constructor(robotName:string,name:string,url:string,fsm:FSM,description:string = "",plugins:Plugin[] = []) {
    this.robotName = robotName;
    this.name = name;
    this.url = url;
    this.description = description;
    this.plugins = plugins;
    this.fsm = fsm;
  }
}

