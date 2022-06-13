import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { AvailabilityFormValue, FindSlotFormValue } from 'src/app/shared/models/forms';
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
    spy = spyOn(service, 'parseAvailabilityUser').and.callThrough();
    service.parseAvailabilityUser(interviewerID);
    expect(service.parseAvailabilityUser).toHaveBeenCalled();
  });

  it('addAvailability calls requester methods', () => {
    let form: AvailabilityFormValue = {
      firstDate: "1995-12-17T03:24:00",
      lastDate:  "1995-12-19T03:24:00",
      startTime:  "1995-12-17T09:24:00",
      endTime:  "1995-12-19T12:24:00",
    }
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailabilityForm(form);
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
    let dates: string[]=['2022-06-01','2022-06-02','2022-06-03',];
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addAvailabilityOverRange('09:00', '17:00', dates);
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
    let form: FindSlotFormValue = {
      startTime: '13:00',
      endTime: '17:00',
      firstDate: '2022-05-20',
      lastDate: "2022-05-25",
      skills: { 
        skillType: 'Java', 
        skillLevel: 'Senior' 
      }
    }
    let events: AvailabilityForInterviews[] = [];

    service.getInterviewSlots(form, [3], events);
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));
});
