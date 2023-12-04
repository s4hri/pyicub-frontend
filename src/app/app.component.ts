import { Component,OnInit } from '@angular/core';
import {RobotsService} from "./services/robots.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  robots$ = this.robotsService.robots$;
  isLoadingRobots$ = this.robotsService.isLoadingRobots$;
  constructor(private robotsService:RobotsService){}

  onReloadButtonClick(){
    this.robotsService.updateRobots();
  }

  ngOnInit(): void {
    this.robotsService.updateRobots();
  }

}
