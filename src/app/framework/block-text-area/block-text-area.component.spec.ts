import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTextAreaComponent } from './block-text-area.component';

describe('BlockTextAreaComponent', () => {
  let component: BlockTextAreaComponent;
  let fixture: ComponentFixture<BlockTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
