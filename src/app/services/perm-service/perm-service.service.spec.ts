import { TestBed } from '@angular/core/testing';

import { PermServiceService } from './perm-service.service';

describe('PermServiceService', () => {
  let service: PermServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
