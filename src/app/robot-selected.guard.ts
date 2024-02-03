import {CanActivateFn, Router} from '@angular/router';
import {AppStateService} from "./services/app-state.service";
import {inject} from "@angular/core";
import {SessionStorageService} from "./services/session-storage.service";


export const robotSelectedGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService)
  const router = inject(Router)
  const sessionStorage = inject(SessionStorageService)
  const selectedRobotName = sessionStorage.getSelectedRobot()
  if(selectedRobotName){
    return true;
  }else{
    console.log("GUARD ATTIVATO")
    return router.parseUrl('');
  }

};
