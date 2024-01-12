export class Plugin {
  name:string
  enabled:boolean
  component:any

  constructor(name:string,component:any,enabled:boolean = false) {
    this.name = name;
    this.component = component;
    this.enabled = enabled;
  }

  togglePlugin(){
    this.enabled = !this.enabled
  }

}
