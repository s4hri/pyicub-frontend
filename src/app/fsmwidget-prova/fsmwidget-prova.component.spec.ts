import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSMWidgetProvaComponent } from './fsmwidget-prova.component';

describe('FSMWidgetProvaComponent', () => {
  let component: FSMWidgetProvaComponent;
  let fixture: ComponentFixture<FSMWidgetProvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSMWidgetProvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FSMWidgetProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
