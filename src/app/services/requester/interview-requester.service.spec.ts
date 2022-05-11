import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { fn } from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { interviewReturn } from '../../shared/models/types';

import { InterviewRequesterService } from './interview-requester.service';

const MockService: Pick<InterviewRequesterService, 'addInterviewForm'> ={
  addInterviewForm(){
    return of(true);
  }
}



describe('InterviewRequesterService', () => {
  let service: InterviewRequesterService;
  let spy: any;

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
    service = TestBed.inject(InterviewRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getInterviewByInterviewer gets called', () => {
    let events: CalendarEvent[] = [];
    let userName = "username";
    spy = spyOn(service, 'getInterviewByInterviewer').and.callThrough();
    service.getInterviewByInterviewer(events, userName);
    expect(service.getInterviewByInterviewer).toHaveBeenCalled();
  });

  it('addInterview gets called', () => {
    let interviewerID: number[] = [];
    let interviewDate: string = "";
    let timeStart: string = "";
    let timeEnd: string = "";
    let additionalInfo: string = "";
    spy = spyOn(service, 'addInterview').and.callThrough();
    service.addInterview(interviewerID, interviewDate, timeStart, timeEnd, additionalInfo);
    expect(service.addInterview).toHaveBeenCalled();
  });

  it('getInterviewByRecruiter gets called', () => {
    let events: CalendarEvent[] = [];
    let userName = "username";
    spy = spyOn(service, 'getInterviewByRecruiter').and.callThrough();
    service.getInterviewByRecruiter(events, userName);
    expect(service.getInterviewByRecruiter).toHaveBeenCalled();
  });

  it('addInterviewForm gets called', () => {
    let formInput: string = "";
    let additional: string = "";
    let startTime: Date = new Date();
    spy = spyOn(service, 'addInterviewForm').and.callThrough();
    service.addInterviewForm(formInput, additional, startTime);
    expect(service.addInterviewForm).toHaveBeenCalled();
  });

  
  it('outputInterviewEvent gets called', () => {
    let formInput: interviewReturn = new interviewReturn(0,[],"","","","","","");
    spy = spyOn(service, 'outputInterviewEvent').and.callThrough();
    service.outputInterviewEvent(formInput);
    expect(service.outputInterviewEvent).toHaveBeenCalled();
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
