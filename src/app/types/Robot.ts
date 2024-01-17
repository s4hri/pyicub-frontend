import {Application} from "./Application";
export interface Robot{
  name:string
  url:string
  applications:Application[]
  selectedApplication:Application

}
