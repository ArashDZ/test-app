import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeconCompComponent } from './secon-comp.component';

describe('SeconCompComponent', () => {
  let component: SeconCompComponent;
  let fixture: ComponentFixture<SeconCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeconCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeconCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
