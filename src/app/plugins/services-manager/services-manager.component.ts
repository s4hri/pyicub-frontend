import {Component, OnInit} from '@angular/core';
import { WidgetBaseComponent } from '../../widget-base/widget-base.component';
import {Service, ServiceState} from "../../types/Service";
import {ApplicationArgType} from "../../types/ApplicationArgType";
import {Series} from "d3-shape";

@Component({
  selector: 'app-services-manager',
  templateUrl: './services-manager.component.html',
  styleUrl: './services-manager.component.css'
})
export class ServicesManagerComponent extends WidgetBaseComponent implements OnInit{

  services: Service[] = [];
  isLoading = true;
  search: string;
  showErrorDialog: boolean = false;
  errorMessage: string;

  nodeColors = {
    INACTIVE: 'gray',
    ACTIVE: 'white',
    RUNNING: 'yellow',
    FAILED: 'red',
    DONE: 'green'
  }

  get filteredServices(): Service[] {

    if (!this.search) {
      return this.services
    } else {
      return this.services.filter(service => service.name.toLowerCase().includes(this.search.toLowerCase()))
    }

  }

  canRunService(service:Service){
    let canRun = true;
    for(let arg of Object.keys(service.argsTemplate)){
      if(!service.args[arg]){
        canRun = false;
      }
    }
    return canRun
  }

  hasArguments(service:Service){
    return Object.keys(service.argsTemplate).length !== 0
  }



  onServiceClick(selectedService: Service) {

    if (selectedService.state === ServiceState.ACTIVE) {

      this.services.forEach(service => {
        if (selectedService.name !== service.name) {
          this.updateServiceState(service, ServiceState.INACTIVE)
        }
      })

      this.runServiceAsync(`${this.application.name}.${selectedService.name}`,selectedService.args).subscribe(reqID => {

        //console.log("RISPOSTA PLAYACTION: ",reqID)

        const onRunning = () => {
          this.updateServiceState(selectedService, ServiceState.RUNNING)
        }

        const onDone = () => {

          this.updateServiceState(selectedService, ServiceState.DONE)
          setTimeout(() => {
            this.services.forEach(action => {
              this.updateServiceState(action, ServiceState.ACTIVE)
            })
          }, 2000)

        }

        const onFailed = () => {

          this.updateServiceState(selectedService, ServiceState.FAILED)
          setTimeout(() => {
            this.services.forEach(action => {
              this.updateServiceState(action, ServiceState.ACTIVE)
            })
          }, 2000)
        }

        this.checkAsyncRequestStatus(reqID, undefined, onRunning, onDone, onFailed)

      })
    }
  }

  onArgumentsServiceClick(selectedService:Service){
    console.log(selectedService)
  }
  private updateServiceState(serviceToUpdate: Service, updatedState: ServiceState) {
    this.services = this.services.map(service => {
      if (service.name === serviceToUpdate.name) {
        return {
          ...service,
          state:updatedState
        }
      }
      return service
    })
  }


  openErrorDialog(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.errorMessage = "";
    this.showErrorDialog = false;
  }

  ngOnInit() {
    this.getApplicationServices().subscribe({
        next: services => {
          const filteredServices = services.filter(service => service.name.startsWith(this.application.name + ".")).map(service => {
            return {
              ...service,
              name:service.name.substring(this.application.name.length + 1)
            }
          })
          this.services = filteredServices;
          this.isLoading = false;
          //console.log(this.actions)
        },
        error: err => {
          console.log(err)
          this.isLoading = false;
          this.openErrorDialog("Impossibile caricare i servizi dell'applicazione")
        }
      }
    )
  }


  protected readonly ApplicationArgType = ApplicationArgType;
  protected readonly Object = Object;
  protected readonly ServiceState = ServiceState;
}
