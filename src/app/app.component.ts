import { Component } from '@angular/core';
import {Robot} from "./robotInterface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  robots:Robot[] = [
    {
      "name": "icub1",
      "url": "http://0.0.0.0:9001/pyicub/icub1",
      "applications": [
        {
          "name": "myRestApp1"
        },
        {
          "name": "myRestApp2"
        }
      ]
    },
    {
      "name": "icub2",
      "url": "http://0.0.0.0:9001/pyicub/icub2",
      "applications": [
        {
          "name": "myRestApp3"
        },
        {
          "name": "myRestApp4"
        }
      ]
    },
    {
      "name": "icub3",
      "url": "http://0.0.0.0:9001/pyicub/icub3",
      "applications": [
        {
          "name": "myRestApp5"
        },
        {
          "name": "myRestApp6"
        }
      ]
    }
  ]

}
