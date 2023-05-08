import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { accessResolver } from './access.resolver';

describe('accessResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => accessResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
