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
import { interviewReturn } from '../../shared/models/types';

import { InterviewRequesterService } from './interview-requester.service';
import { Requester } from './requester.service';

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
}

const interRet: interviewReturn = {
  interview_id: 0,
  interviewers: ["", ""],
  date: "1995-05-10",
  start_time: "10:00",
  end_time: "11:00",
  additional_info: "additional",
  status: "completed",
  outcome: "hired"
}

describe('InterviewRequesterService', () => {
  let service: InterviewRequesterService;
  let spy: any;
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
    service = TestBed.inject(InterviewRequesterService);
    rService = TestBed.inject(Requester);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getInterviewByInterviewer gets called', () => {
    let events: CalendarEvent[] = [];
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getInterviewByInterviewer(events, userName);
    expect(spy).toHaveBeenCalled();
  });
  
  it('getInterviewByRecruiter gets called', () => {
    let events: CalendarEvent[] = [];
    let userName = "username";
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getInterviewByRecruiter(events, userName);
    expect(spy).toHaveBeenCalled();
  });

  it('getInterviewsAll calls requester methods', fakeAsync(() => {
    spy = spyOn(rService, 'getRequest').and.callThrough();
    service.getInterviewAll();
    expect(spy).toHaveBeenCalled();
  }));

  it('outputInterviewEvent formats correctly', () => {
    let retObj = service.outputInterviewEvent(interRet);
    expect(retObj.id === interRet.interview_id).toBeTruthy();
    expect(retObj.meta.interviewPanel === interRet.interviewers).toBeTruthy();

    const start = new Date(interRet.date);
    const times1 = interRet.start_time.split(':');
    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    expect(retObj.start.toString() === start.toString()).toBeTruthy();
  });

  it('addInterview gets called', fakeAsync(() => {
    let interviewerID: number[] = [];
    let interviewDate: string = "";
    let timeStart: string = "";
    let timeEnd: string = "";
    let additionalInfo: string = "";
    spy = spyOn(rService, 'postRequest').and.callThrough();
    service.addInterview(interviewerID, interviewDate, timeStart, timeEnd, additionalInfo);
    expect(spy).toHaveBeenCalled();
  }));


  it('addInterviewForm calls requester methods', () => {
    let formInput: string = "On 2022-04-19 between 13:00 -> 14:00 this is with: Emer Sweeney id: 19";
    let additional: string = "";
    let startTime: Date = new Date();
    spy = spyOn(service, 'addInterview').and.callThrough();
    service.addInterviewForm(formInput, additional, startTime);
    expect(spy).toHaveBeenCalled();

    let startTimeNull: any = <Date><unknown>'';
    service.addInterviewForm(formInput, additional, startTimeNull);
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


