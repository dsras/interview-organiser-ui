import { TestBed } from '@angular/core/testing';

import { AvailabilityRequesterService } from './availability-requester.service';

describe('AvailabilityRequesterService', () => {
  let service: AvailabilityRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
