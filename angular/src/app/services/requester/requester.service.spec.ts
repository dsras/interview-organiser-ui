import { TestBed } from '@angular/core/testing';

import { Requester } from './requester.service';

describe('RequesterService', () => {
  let service: Requester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Requester);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
