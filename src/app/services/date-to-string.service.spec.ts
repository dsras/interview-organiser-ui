import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { DateToStringService } from './date-to-string.service';

describe('DateToStringService', () => {
  let service: DateToStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
      ],
      providers: [
        DatePipe,
      ],
    });
    service = TestBed.inject(DateToStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('date should be formatted to YYYY-MM-DD', () => {
    let tempDate = new Date('1995-12-17T03:24:00');
    expect(service.dateToStringDate(tempDate) === "1995-12-17").toBeTruthy();
  });

  it('time should be formatted to HH:MM', () => {
    let tempDate = new Date('1995-12-17T03:24:00');
    expect(service.dateToStringTime(tempDate) === "03:24").toBeTruthy();
  });
});
