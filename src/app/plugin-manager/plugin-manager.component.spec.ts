import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginManagerComponent } from './plugin-manager.component';

describe('PluginManagerComponent', () => {
  let component: PluginManagerComponent;
  let fixture: ComponentFixture<PluginManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluginManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluginManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
