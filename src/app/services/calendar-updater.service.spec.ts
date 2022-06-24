import { TestBed } from '@angular/core/testing';

import { CalendarUpdaterService } from './calendar-updater.service';

describe('CalendarService', () => {
  let service: CalendarUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
