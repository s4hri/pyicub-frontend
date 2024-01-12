import {Plugin} from "./Plugin";
import {BehaviorSubject, filter, map} from "rxjs";

export class Application{
  name:string
  url:string
  description:string

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

  constructor(name:string,url:string,description:string = "",plugins:Plugin[] = []) {
    this.name = name;
    this.url = url;
    this.description = description;
    this.plugins = plugins
  }
}

