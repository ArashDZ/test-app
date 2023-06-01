import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

let data = new BehaviorSubject({access: true});
export let ActivatedRouteStub = {data: data.asObservable(), params: of({id: 2321})};

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPageComponent ],
      providers: [{provide: ActivatedRoute, useValue: ActivatedRouteStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should show inaccessibe', () => {
    data.next({ access: false });
    let nE: HTMLElement = fixture.nativeElement;
    expect(component.access).toBeFalse();
    fixture.detectChanges();
    expect(nE.querySelector('h1')).toBeTruthy();
  })
});
