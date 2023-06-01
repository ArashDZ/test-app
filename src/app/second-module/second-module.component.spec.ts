import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondModuleComponent } from './second-module.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActivatedRouteStub } from '../auth-page/auth-page.component.spec';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { SecondService } from '../services/second/second.service';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { AbstractLogService } from '../services/second/abstract-log.service';

describe('SecondModuleComponent', () => {
  let component: SecondModuleComponent;
  let fixture: ComponentFixture<SecondModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondModuleComponent ],
      imports: [RouterModule],
      providers: [
        {provide: ActivatedRoute, useValue: ActivatedRouteStub},
        {provide: AbstractLogService, useValue: {log: () => {}}},
        {provide: PermServiceService, useValue: {}}
      ]
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
