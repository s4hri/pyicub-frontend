import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Application} from "../types/Application";
import {ApplicationArgType} from "../types/ApplicationArgType";

@Component({
  selector: 'app-application-args-dialog',
  templateUrl: './application-args-dialog.component.html',
  styleUrl: './application-args-dialog.component.css'
})
export class ApplicationArgsDialogComponent implements OnInit{

  args:any = {}
  constructor(@Inject(MAT_DIALOG_DATA) public data: Application, public dialogRef:MatDialogRef<ApplicationArgsDialogComponent>) {}

  closeDialog(){
    this.dialogRef.close()
  }

  ngOnInit() {
    const argsTemplate = this.data.argsTemplate

    this.args = Object.keys(this.data.argsTemplate).map(arg => {
      switch (this.data.argsTemplate[arg].type) {
        case ApplicationArgType.STRING:
          this.args[arg] = "";
          break;
        case ApplicationArgType.NUMBER:
          this.args[arg] = 0;
          break;
        case ApplicationArgType.ARRAY_NUMBER:
          this.args[arg] = this.data.argsTemplate[arg].value[0]
          break;
        case ApplicationArgType.ARRAY_STRING:
          this.args[arg] = this.data.argsTemplate[arg].value[0]
          break;
        case ApplicationArgType.BOOLEAN:
          this.args[arg] = this.data.argsTemplate[arg].value
          break;

      }
    })

  }


  protected readonly Object = Object;
  protected readonly ApplicationArgType = ApplicationArgType;
}
