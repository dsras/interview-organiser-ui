import { TestBed } from '@angular/core/testing';

import { RequestCenterService } from './request-center.service';

describe('RequestCenterService', () => {
  let service: RequestCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
