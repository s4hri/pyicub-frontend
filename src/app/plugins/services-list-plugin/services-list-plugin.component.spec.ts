import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesListPluginComponent } from './services-list-plugin.component';

describe('ServicesListPluginComponent', () => {
  let component: ServicesListPluginComponent;
  let fixture: ComponentFixture<ServicesListPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesListPluginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesListPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
