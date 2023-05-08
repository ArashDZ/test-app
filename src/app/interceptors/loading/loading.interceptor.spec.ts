import { TestBed } from '@angular/core/testing';

import { LogLoadingInterceptor } from './loading.interceptor';

describe('LogLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogLoadingInterceptor = TestBed.inject(LogLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
