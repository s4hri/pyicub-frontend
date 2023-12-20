export class Plugin {
  name:string
  enabled:boolean

  constructor(name:string = "",enabled:boolean = false) {
    this.name = name;
    this.enabled = enabled;
  }
}
