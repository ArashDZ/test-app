import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWrapComponent } from './input-wrap.component';

describe('InputWrapComponent', () => {
  let component: InputWrapComponent;
  let fixture: ComponentFixture<InputWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
