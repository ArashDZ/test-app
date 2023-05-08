import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondModuleComponent } from './second-module.component';

describe('SecondModuleComponent', () => {
  let component: SecondModuleComponent;
  let fixture: ComponentFixture<SecondModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
