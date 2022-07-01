import { TestBed } from '@angular/core/testing';

import { OverviewUpdaterService } from './overview-updater.service';

describe('OverviewUpdaterService', () => {
  let service: OverviewUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
