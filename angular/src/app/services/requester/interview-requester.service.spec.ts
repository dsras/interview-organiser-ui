import { TestBed } from '@angular/core/testing';

import { InterviewRequesterService } from './interview-requester.service';

describe('InterviewRequesterService', () => {
  let service: InterviewRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
