import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { fn } from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { CreateInterviewFormValue } from 'src/app/shared/models/forms';
import { AvailabilityForInterviews, InterviewReturn } from '../../shared/models/types';
import { GetUserDataService } from '../get-user-data.service';

import { InterviewRequesterService } from './interview-requester.service';
import { Requester } from './requester.service';

const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}

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
    return of('POST');
  },
  postRequestNoType<Type>(reqestURL: string, obj: any): Observable<any> {
    return of('POST');
  },
}

const interRet: InterviewReturn = {
  interviewId: 0,
  interviewers: ["", ""],
  date: "2022-06-01T00:00:00.000Z",
  startTime: "2022-06-01T09:00:00.000Z",
  endTime: "2022-06-01T13:00:00.000Z",
  additionalInfo: "additional",
  status: "completed",
  outcome: "hired"
}

describe('InterviewRequesterService', () => {
  let service: InterviewRequesterService;
  let spy: any;
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
    service = TestBed.inject(InterviewRequesterService);
    rService = TestBed.inject(Requester);
    uService = TestBed.inject(GetUserDataService);

  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('InterviewsFindAll calls requester methods', fakeAsync(() => {
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindAll();
    expect(spy).toHaveBeenCalled();
  }));

  it('InterviewsFindCompleted gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindCompleted(userName);
    expect(spy).toHaveBeenCalled();
  });
  
  it('InterviewsFindConfirmed gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindConfirmed(userName);
    expect(spy).toHaveBeenCalled();
  });  
  it('InterviewsFindPanelNoShow gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindPanelNoShow(userName);
    expect(spy).toHaveBeenCalled();
  });
  it('InterviewsFindCandidateNoShow gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindCandidateNoShow(userName);
    expect(spy).toHaveBeenCalled();
  });
  it('InterviewsFindProgressed gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindProgressed(userName);
    expect(spy).toHaveBeenCalled();
  });
  it('InterviewsFindNotProgressed gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindNotProgressed(userName);
    expect(spy).toHaveBeenCalled();
  });
  it('InterviewsFindHired gets called', () => {
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindHired(userName);
    expect(spy).toHaveBeenCalled();
  });

  
  it('getInterviewsPerMonthByInterviewer gets called', () => {
    spy = spyOn(rService, 'postRequestNoType').and.returnValue(of([interRet]));
    service.getInterviewsPerMonthByInterviewer(true, "09:00", '17:00');
    expect(spy).toHaveBeenCalled();
  });

  it('getInterviewsAll calls requester methods', fakeAsync(() => {
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.InterviewsFindAll();
    expect(spy).toHaveBeenCalled();
  }));

  it('outputInterviewEvent formats correctly', () => {
    let retObj = service.parseInterviewUser(interRet);
    expect(retObj.id === interRet.interviewId).toBeTruthy();
    expect(retObj.meta.interviewPanel === interRet.interviewers).toBeTruthy();

    const start = new Date(interRet.date);
    const times1 = interRet.startTime.split(':');
    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    expect(retObj.start.toString() === start.toString()).toBeTruthy();
  });

  it('addInterview gets called', fakeAsync(() => {
    let interviewerID: number[] = [];
    let interviewDate: string = "";
    let timeStart: string = "19:00";
    let timeEnd: string = "21:00";
    let additionalInfo: string = "";
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.createInterview('name', interviewerID, interviewDate, timeStart, timeEnd, additionalInfo);
    expect(spy).toHaveBeenCalled();
  }));


  it('addInterviewForm calls requester methods', () => {
    let form: CreateInterviewFormValue  ={
      interviewSelected: {
        interviewer:"Emer Sweeny",
        interviewerId: 19,
        availabilityId: 1,
        date: "2022-04-19",
        startTime: "13:00",
        endTime: "14:00"
      },
      additionalInformation: 'urm',
      startTime: "13:00"
    };
    spy = spyOn(service, 'addInterviewForm').and.callThrough();
    service.addInterviewForm(form);
    expect(spy).toHaveBeenCalled();

    form ={
      interviewSelected: {
        interviewer:"Emer Sweeny",
        interviewerId: 19,
        availabilityId: 1,
        date: "2022-04-19",
        startTime: "13:00",
        endTime: "14:00"
      },
      additionalInformation: 'urm',
      startTime: ""
    };
    service.addInterviewForm(form);
    expect(spy).toHaveBeenCalled();
  });

  it('GetUserInterviews calls service methods', () => {
    let spy = spyOn(rService, 'getRequest').and.callThrough();
    let ints: CalendarEventInterview[]=[];
    let avail: CalendarEvent[]=[];
    service.getUserInterviews(avail, ints);
    expect(spy).toHaveBeenCalled();

  });
  it('getRecruiterInterviews calls service methods', () => {
    let spy = spyOn(rService, 'getRequest').and.callThrough();
    let ints: CalendarEventInterview[]=[];
    let avail: CalendarEvent[]=[];
    service.getRecruiterInterviews(avail, ints);
    expect(spy).toHaveBeenCalled();

  });
  
  it('date should be formatted to YYYY-MM-DD', () => {
    let tempDate = new Date('1995-12-17T03:24:00');
    expect(service.dateToStringDate(tempDate) === "1995-12-17").toBeTruthy();
  });

  it('time should be formatted to HH:MM', () => {
    let tempDate = new Date('1995-12-17T03:24:00');
    expect(service.dateToStringTime(tempDate) === "03:24").toBeTruthy();
  });

  it('time add function should add to time', () => {
    let time = "09:00";
    expect(service.stringTimeAdd(time, 1) == "10:00").toBeTruthy();
    time = "08:00";
    expect(service.stringTimeAdd(time, 1) == "09:00").toBeTruthy();
  })
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
  });
});


