import { TestBed } from '@angular/core/testing';

import { RoleViewService } from './role-view.service';

describe('RoleViewService', () => {
  let service: RoleViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
