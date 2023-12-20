import {Component, inject, Input} from '@angular/core';
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-widget-base',
  templateUrl: './widget-base.component.html',
  styleUrl: './widget-base.component.css'
})
export class WidgetBaseComponent {
  @Input()
  appName:string;

  protected apiService = inject(ApiService);

}
