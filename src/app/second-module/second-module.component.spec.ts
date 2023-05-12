import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondModuleComponent } from './second-module.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../auth-page/auth-page.component.spec';

describe('SecondModuleComponent', () => {
  let component: SecondModuleComponent;
  let fixture: ComponentFixture<SecondModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondModuleComponent ],
      providers: [{provide: ActivatedRoute, useValue: ActivatedRouteStub}]
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
