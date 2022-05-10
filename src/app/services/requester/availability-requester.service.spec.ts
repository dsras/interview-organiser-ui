import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { availability } from '../../shared/models/types';

import { AvailabilityRequesterService } from './availability-requester.service';

describe('AvailabilityRequesterService', () => {
  let service: AvailabilityRequesterService;
  let spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,              
      ],
    });
    service = TestBed.inject(AvailabilityRequesterService);
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

  it('parseAvailabilityEvent gets called', () => {
    let interviewerID: availability= new availability(0,"","","");
    spy = spyOn(service, 'parseAvailabilityEvent').and.callThrough();
    service.parseAvailabilityEvent(interviewerID);
    expect(service.parseAvailabilityEvent).toHaveBeenCalled();
  });

  it('addAvailability gets called', () => {
    let first: string = "1995-12-17T03:24:00";
    let last: string = "1995-12-19T03:24:00";
    let start: string = "1995-12-17T09:24:00";
    let end: string = "1995-12-19T12:24:00";
    spy = spyOn(service, 'addAvailability').and.callThrough();
    service.addAvailability(first, last, start, end);
    expect(service.addAvailability).toHaveBeenCalled();
  });

  it('getMyAvailability gets called', () => {
    let events: CalendarEvent[] = [];
    let userName: string = "";
    spy = spyOn(service, 'getMyAvailability').and.callThrough();
    service.getMyAvailability(events, userName);
    expect(service.getMyAvailability).toHaveBeenCalled();
  });
  
  it('getAvailabilityOnSkill gets called', () => {
    let numbers: number[] = [];
    spy = spyOn(service, 'getAvailabilityOnSkill').and.callThrough();
    service.getAvailabilityOnSkill(numbers);
    expect(service.getAvailabilityOnSkill).toHaveBeenCalled();
  });
  
});
