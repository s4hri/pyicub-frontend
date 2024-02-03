import {CanActivateFn, Router} from '@angular/router';
import {AppStateService} from "./services/app-state.service";
import {inject} from "@angular/core";


export const robotSelectedGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService)
  const router = inject(Router)
  if(appState.selectedRobot){
    return true;
  }else{
    console.log("GUARD ATTIVATO")
    return router.parseUrl('');
  }

};
