import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private SELECTED_ROBOT_KEY = "selectedRobot";
  private SELECTED_APPLICATION_KEY = "selectedApplication";

  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public getData(key: string) {
    return sessionStorage.getItem(key)
  }
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }

  public saveSelectedRobot(robotName:string){
    sessionStorage.setItem(this.SELECTED_ROBOT_KEY,robotName)
}

public getSelectedRobot(){
    return sessionStorage.getItem(this.SELECTED_ROBOT_KEY)
}

public saveSelectedApplication(applicationName:string){
    return sessionStorage.setItem(this.SELECTED_APPLICATION_KEY,applicationName)
}

public getSelectedApplication(){
    return sessionStorage.getItem(this.SELECTED_APPLICATION_KEY)
}

}
