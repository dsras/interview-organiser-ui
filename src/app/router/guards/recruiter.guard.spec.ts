import { TestBed } from '@angular/core/testing';

import { RecruiterGuard } from './recruiter.guard';

describe('RecruiterGuard', () => {
  let guard: RecruiterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecruiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
