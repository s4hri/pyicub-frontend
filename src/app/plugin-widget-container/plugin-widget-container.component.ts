import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
@Component({
  selector: 'app-plugin-widget-container',
  templateUrl: './plugin-widget-container.component.html',
  styleUrl: './plugin-widget-container.component.css'
})
export class PluginWidgetContainerComponent implements AfterViewInit,OnDestroy{

  @Input()
  widget;

  @ViewChild('content', { read: ViewContainerRef })
  private content: ViewContainerRef;

  private ref:ComponentRef<any>;


  ngOnDestroy() {
    if (this.ref){
      this.ref.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.ref = this.content.createComponent(this.widget);
  }


}
