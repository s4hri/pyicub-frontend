import {Component, Input} from '@angular/core';
import {ServiceListItem} from "../ServiceListItem";

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrl: './service-list-item.component.css'
})
export class ServiceListItemComponent {

  @Input()
  service:ServiceListItem

}
