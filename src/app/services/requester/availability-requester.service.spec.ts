import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { availability } from '../../shared/models/types';

import { AvailabilityRequesterService } from './availability-requester.service';
import { Requester } from './requester.service';

const AvailabilityInfoFake: availability = {
  availability_id: 0,
  date: new Date().toString(),
  start_time: new Date().toString(),
  end_time: new Date().toString(),
}

const FakeAvailabilityReturn: availability[] = [
  {
    availability_id: 0,
    date: new Date().toString(),
    start_time: new Date().toString(),
    end_time: new Date().toString(),
  },
  {
    availability_id: 0,
    date: new Date().toString(),
    start_time: new Date().toString(),
    end_time: new Date().toString(),
  },
]

describe('AvailabilityRequesterService', () => {
  let service: AvailabilityRequesterService;
  let spy;
  let rService: Requester;

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
    rService = TestBed.inject(Requester);
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


  it('addAvailability calls requester methods', () => {
    let first: string = "1995-12-17T03:24:00";
    let last: string = "1995-12-19T03:24:00";
    let start: string = "1995-12-17T09:24:00";
    let end: string = "1995-12-19T12:24:00";
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailability(first, last, start, end);
    expect(spy).toHaveBeenCalled();
  });


  it('parseAvailabilityEvent formats correctly', () => {
    let retObj = service.parseAvailabilityEvent(AvailabilityInfoFake);
    expect(retObj.id === AvailabilityInfoFake.availability_id).toBeTruthy();

    const start = new Date(AvailabilityInfoFake.date);
    const times1 = AvailabilityInfoFake.start_time.split(':');
    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    expect(retObj.start.toString() === start.toString()).toBeTruthy();
  });


  it('getMyAvailability calls requester methods', fakeAsync(() => {
    let events: CalendarEvent[] = [];
    let userName: string = "";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getMyAvailability(events, userName);
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));

  it('getAvailabilityAll calls the requester methods', fakeAsync(() => {
    let events: CalendarEvent[] = [];
    spy = spyOn(rService, 'getRequest').and.returnValue(<Observable<any>><unknown>FakeAvailabilityReturn);
    service.getAllAvailability(events);
    tick(3);
    expect(spy).toHaveBeenCalled();
    expect(events.length != 0).toBeTruthy();
  }));
  
  it('getAvailabilityOnSkill calls requester methods', fakeAsync(() => {
    let numbers: number[] = [];
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getAvailabilityOnSkill(numbers);
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));
    
  it('getAvailabilityByRange calls requester methods', fakeAsync(() => {
    spy = spyOn(rService, 'postRequestNoType').and.callThrough();
    service.getAvailabilityByRange(new Date().toString(), new Date().toString(), new Date().toString(), new Date().toString(),[1],[]);
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));
});
