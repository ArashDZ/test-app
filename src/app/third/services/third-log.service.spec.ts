import { TestBed } from '@angular/core/testing';

import { ThirdLogService } from './third-log.service';
import { AbstractLogService } from 'src/app/services/second/abstract-log.service';

describe('ThirdLogService', () => {
  let service: ThirdLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractLogService, ThirdLogService]
    });
    service = TestBed.inject(ThirdLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
