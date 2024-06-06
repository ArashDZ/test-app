import { TestBed } from '@angular/core/testing';

import { InjService } from './inj.service';

describe('InjService', () => {
  let service: InjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
