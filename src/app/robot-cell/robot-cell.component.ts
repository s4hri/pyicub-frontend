import {Component, Input} from '@angular/core';
import {Robot} from "../robotInterface";

@Component({
  selector: 'app-robot-cell',
  templateUrl: './robot-cell.component.html',
  styleUrl: './robot-cell.component.css'
})
export class RobotCellComponent {
  @Input() robot:Robot
}
