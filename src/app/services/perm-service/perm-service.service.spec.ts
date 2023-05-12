import { TestBed } from '@angular/core/testing';

import { PermServiceService } from './perm-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('PermServiceService', () => {
  let service: PermServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PermServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
