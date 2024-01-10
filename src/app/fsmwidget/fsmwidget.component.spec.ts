import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSMWidgetComponent } from './fsmwidget.component';

describe('FSMWidgetComponent', () => {
  let component: FSMWidgetComponent;
  let fixture: ComponentFixture<FSMWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSMWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FSMWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
