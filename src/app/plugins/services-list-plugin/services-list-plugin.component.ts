import {Component, OnInit} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {ServiceListItem} from "./ServiceListItem";

@Component({
  selector: 'app-services-list-plugin',
  templateUrl: './services-list-plugin.component.html',
  styleUrl: './services-list-plugin.component.css'
})
export class ServicesListPluginComponent extends WidgetBaseComponent implements OnInit {

  services: ServiceListItem[] = []

  ngOnInit(): void {
    this.apiService.getApplicationServices().subscribe(services => {
      this.services = services;
      }
    )
  }

}
