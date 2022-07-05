import { TestBed } from '@angular/core/testing';

import { FocusDayService } from './focus-day.service';

describe('FocusDayServiceService', () => {
  let service: FocusDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
