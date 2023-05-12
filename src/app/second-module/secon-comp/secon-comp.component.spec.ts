import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeconCompComponent } from './secon-comp.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/auth-page/auth-page.component.spec';

describe('SeconCompComponent', () => {
  let component: SeconCompComponent;
  let fixture: ComponentFixture<SeconCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeconCompComponent ],
      providers: [{provide: ActivatedRoute, useValue: ActivatedRouteStub}]
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
