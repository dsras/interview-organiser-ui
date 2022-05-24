import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { Availability } from '../../shared/models/types';

import { AvailabilityRequesterService } from './availability-requester.service';
import { Requester } from './requester.service';

const AvailabilityInfoFake: Availability = {
  availability_id: 0,
  date: new Date().toString(),
  start_time: new Date().toString(),
  end_time: new Date().toString(),
}

const FakeAvailabilityReturn: Availability[] = [
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

const RequesterServiceStub = {
  getRequest<Type>(reqestURL: string): Observable<any> {
    return of([{
      interview_id: 0,
      interviewers: ["", ""],
      date: "1995-05-10",
      start_time: "10:00",
      end_time: "11:00",
      additional_info: "additional",
      status: "completed",
      outcome: "hired"
      }]);
  },
  postRequest<Type>(reqestURL: string, obj: Type): Observable<any> {
    return of([{ 
      interview_id: 0,
      interviewers: ["", ""],
      date: "1995-05-10",
      start_time: "10:00",
      end_time: "11:00",
      additional_info: "additional",
      status: "completed",
      outcome: "hired"
    }]);
  },
  postRequestNoType<type>(link: string, obj: any): Observable<any> {
    return of([{ 
      interview_id: 0,
      interviewers: ["", ""],
      date: "1995-05-10",
      start_time: "10:00",
      end_time: "11:00",
      additional_info: "additional",
      status: "completed",
      outcome: "hired"
    }]);
  }
}

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
        {provide: Requester, useValue: RequesterServiceStub},
        
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

  it('parseAvailabilityEvent gets called', () => {
    let interviewerID: Availability= new Availability(0,"","","");
    spy = spyOn(service, 'parseAvailabilityEvent').and.callThrough();
    service.parseAvailabilityEvent(interviewerID);
    expect(service.parseAvailabilityEvent).toHaveBeenCalled();
  });

  it('addAvailability calls requester methods', () => {
    let first: string = "1995-12-17T03:24:00";
    let last: string = "1995-12-19T03:24:00";
    let start: string = "1995-12-17T09:24:00";
    let end: string = "1995-12-19T12:24:00";
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailability('name',first, last, start, end);
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
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getAllAvailability(events);
    tick(3);
    expect(spy).toHaveBeenCalled();
    expect(events.length != 0).toBeTruthy();
  }));
  
  it('getAllAvailabilityUI calls the requester methods', fakeAsync(() => {
    let events: string[] = [];
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getAllAvailabilityUI(events);
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
