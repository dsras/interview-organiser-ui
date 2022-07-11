import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { AvailabilityArrayFormValue, FindSlotFormValue } from 'src/app/shared/models/forms';
import { Availability, AvailabilityForInterviews, InterviewReturn } from '../../shared/models/types';
import { GetUserDataService } from '../get-user-data.service';

import { AvailabilityRequesterService } from './availability-requester.service';
import { Requester } from './requester.service';

const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}

const AvailabilityInfoFake: Availability = {
  availabilityId: 0,
  date: new Date().toString(),
  startTime: new Date().toString(),
  endTime: new Date().toString(),
}

const FakeAvailabilityReturn: Availability[] = [
  {
    availabilityId: 0,
    date: new Date().toString(),
    startTime: new Date().toString(),
    endTime: new Date().toString(),
  },
  {
    availabilityId: 0,
    date: new Date().toString(),
    startTime: new Date().toString(),
    endTime: new Date().toString(),
  },
]

class FakeSlotForm{
  startTime: string = '2022-06-01T09:00:00.000Z';
  endTime: string = '2022-06-01T13:00:00.000Z';
  firstDate: string = '2022-06-01T09:00:00.000Z';
  lastDate: string = '2022-06-07T09:00:00.000Z';
  skills = { 
    skillType: 'Java',
    skillLevel: 'Junior',
  };
}

const RequesterServiceStub = {
  getRequest<Type>(reqestURL: string): Observable<any> {
    return of([{
      interview_id: 0,
      interviewers: ["", ""],
      date: "1995-05-10",
      startTime: "10:00",
      endTime: "11:00",
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
      startTime: "10:00",
      endTime: "11:00",
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
      startTime: "10:00",
      endTime: "11:00",
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
  let uService: GetUserDataService;

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
        {
          provide: GetUserDataService,
          useValue: FakeUserDataService
        },
        
      ],
    });
    service = TestBed.inject(AvailabilityRequesterService);
    rService = TestBed.inject(Requester);
    uService = TestBed.inject(GetUserDataService);

  });

  it('delete Availability should call delete service method', () => {
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.deleteAvailability(1);
    expect(spy).toHaveBeenCalled();
  });

  it('getSlots should call service method', () => {
    spy = spyOn(rService, 'postRequestNoType').and.callThrough();
    service.getSlots(new FakeSlotForm, [1]);
    expect(spy).toHaveBeenCalled();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('date should be formatted to YYYY-MM-DD', () => {
    let tempDate = new Date('2022-06-01T09:00:00.000');
    expect(service.dateToStringDate(tempDate) === "2022-06-01").toBeTruthy();
  });
  it('time should be formatted to HH:MM', () => {
    let tempDate = new Date('2022-06-01T09:00:00.000');
    let timeString = service.dateToStringTime(tempDate);
    console.log("the time");
    console.log(timeString);
    expect(timeString === "09:00").toBeTruthy();
  });

  it('parseAvailabilityEvent gets called', () => {
    let interviewerID: Availability= new Availability(0,"","","");
    spy = spyOn(service, 'parseAvailabilityUser').and.callThrough();
    service.parseAvailabilityUser(interviewerID);
    expect(service.parseAvailabilityUser).toHaveBeenCalled();
  });

  it('addAvailability calls requester methods', () => {
    let form: AvailabilityArrayFormValue = {
      startTime:  "2022-06-01T09:00:00.000Z",
      endTime:  "2022-06-07T13:00:00.000Z",
      weeks: 1,
      days:[
        {weekday: '2022-06-01T09:00:00.000Z'},
        {weekday: '2022-06-05T09:00:00.000Z'},
      ]
    }
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailabilityArray(form);
    expect(spy).toHaveBeenCalled();
  });


  it('parseAvailabilityEvent formats correctly', () => {
    let retObj = service.parseAvailabilityUser(AvailabilityInfoFake);
    expect(retObj.id === AvailabilityInfoFake.availabilityId).toBeTruthy();

    const start = new Date(AvailabilityInfoFake.date);
    const times1 = AvailabilityInfoFake.startTime.split(':');
    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    expect(retObj.start.toString() === start.toString()).toBeTruthy();
  });


  it('getMyAvailability calls requester methods', fakeAsync(() => {
    let events: CalendarEvent[] = [];
    let dates: string[]=['2022-06-01T09:00:00.000Z','2022-06-04T09:00:00.000Z','2022-06-07T09:00:00.000Z',];
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailabilityRange(new FakeSlotForm());
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
  

    
  it('getAvailabilityByRange calls requester methods', fakeAsync(() => {
    spy = spyOn(rService, 'postRequestNoType').and.callThrough();
    service.getSlots(new FakeSlotForm, [1,2,3]);
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));
});
