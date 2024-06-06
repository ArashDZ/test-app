import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredDialogComponent } from './expired-dialog.component';

describe('ExpiredDialogComponent', () => {
  let component: ExpiredDialogComponent;
  let fixture: ComponentFixture<ExpiredDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
