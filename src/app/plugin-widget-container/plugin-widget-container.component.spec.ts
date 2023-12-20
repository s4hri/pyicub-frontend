import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginWidgetContainerComponent } from './plugin-widget-container.component';

describe('PluginWidgetContainerComponent', () => {
  let component: PluginWidgetContainerComponent;
  let fixture: ComponentFixture<PluginWidgetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluginWidgetContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
