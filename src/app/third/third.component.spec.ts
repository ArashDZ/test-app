import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdComponent } from './third.component';
import { SecondService } from '../services/second/second.service';
import { FormsModule } from '@angular/forms';

describe('ThirdComponent', () => {
  let component: ThirdComponent;
  let fixture: ComponentFixture<ThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdComponent ],
      imports: [FormsModule],
      providers: [{provide: SecondService, useValue: {log: () => {}}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
