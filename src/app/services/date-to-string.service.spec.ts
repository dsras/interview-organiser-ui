import { TestBed } from '@angular/core/testing';

import { DateToStringService } from './date-to-string.service';

describe('DateToStringService', () => {
  let service: DateToStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateToStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
