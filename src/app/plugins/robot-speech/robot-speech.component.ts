import { Component } from '@angular/core';
import { WidgetBaseComponent } from '../../widget-base/widget-base.component';

@Component({
  selector: 'app-robot-speech',
  templateUrl: './robot-speech.component.html',
  styleUrl: './robot-speech.component.css'
})
export class RobotSpeechComponent extends WidgetBaseComponent {

  readonly messageColors = {
    "SENDING":'yellow',
    "SENT":'green',
    "FAILED":'red'
  }
  messages:{text:string,status:"SENDING"|"SENT"|"FAILED"}[] = [];
  newMessage = "Inizio"

}
