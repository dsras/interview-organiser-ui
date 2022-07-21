import { TestBed } from '@angular/core/testing';

import { ErrorAlertService } from './error-alert.service';

describe('ErrorAlertService', () => {
  let service: ErrorAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
