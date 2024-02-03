import {CanActivateFn, Router} from '@angular/router';
import {AppStateService} from "./services/app-state.service";
import {inject} from "@angular/core";


export const applicationSelectedGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService)
  const router = inject(Router)
  if(appState.selectedRobot && appState.selectedRobot.selectedApplication){
    return true;
  }else{
    console.log("GUARD ATTIVATO APPLICATION")
    return router.parseUrl('');
  }

};
