import { TestBed } from '@angular/core/testing';

import { SecondLogService } from './second-log.service';

describe('LogService', () => {
  let service: SecondLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
