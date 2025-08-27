import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletionComponent } from './autocompletion.component';

describe('AutocompletionComponent', () => {
  let component: AutocompletionComponent;
  let fixture: ComponentFixture<AutocompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompletionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutocompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
