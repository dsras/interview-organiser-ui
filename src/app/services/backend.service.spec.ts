import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { APPCONSTANTS } from '../shared/constants/app.constant';
import { BackendService } from './backend.service';
import { Requester } from './requester/requester.service';

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
  postRequestNoAuth<type>(link: string, obj: any): Observable<any> {
    return of('POST');
  }
}

describe('BackendService', () => {
  let service: BackendService;
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
        HttpClient
   
      ],
    });
    service = TestBed.inject(BackendService);
    rService = TestBed.inject(Requester);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('InterviewsFindCompleted gets called', () => {
    let IUser = {username: 'name', password: 'pass'};
    let spy = spyOn(rService, 'postRequestNoAuth').and.callThrough();
    service.login(IUser);
    expect(spy).toHaveBeenCalled();
  });
  
});
