import { TestBed } from '@angular/core/testing';

import { MockInjectorService } from './mock-injector.service';

describe('MockInjectorService', () => {
  let service: MockInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
