import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugindiprovaComponent } from './plugindiprova.component';

describe('PlugindiprovaComponent', () => {
  let component: PlugindiprovaComponent;
  let fixture: ComponentFixture<PlugindiprovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlugindiprovaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlugindiprovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
