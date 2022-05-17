import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Skills, SkillOptions } from 'src/app/shared/models/types';

import { RequestCenterService } from './request-center.service';
import { Requester } from './requester.service';

const RequesterServiceStub = {
  getRequest<Type>(reqestURL: string): Observable<any> {
    return of(['GET']);
  },
  postRequest<Type>(reqestURL: string, obj: Type): Observable<any> {
    return of('POST');
  },
}


describe('RequestCenterService', () => {
  let service: RequestCenterService;
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
    service = TestBed.inject(RequestCenterService);
    rService = TestBed.inject(Requester);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get methods call requester get', fakeAsync(() => {
    let spy = spyOn(rService, "getRequest").and.callThrough();
    service.getUser("test@accolitedigital.com");
    tick(3);
    expect(spy).toHaveBeenCalled();

    service.getUserData("test@accolitedigital.com");
    tick(3);
    expect(spy).toHaveBeenCalled();

    service.getSkills("test@accolitedigital.com");
    tick(3);
    expect(spy).toHaveBeenCalled();

    let skillsAvailable: Skills[] = [];
    /** Options for filtering by skill */
    let skillOptions: SkillOptions = {
      skillNames: new Set<string>(),
      skillLevels: new Set<string>(),
    };
  
    service.getAllSkills(skillsAvailable, skillOptions);
    tick(3);
    expect(spy).toHaveBeenCalled();

  }));

  it('post methods should call post request', fakeAsync(() => {
    let spy = spyOn(rService, "postRequest").and.callThrough();
    service.addSkills(1, "test@accolitedigital.com");
    tick(3);
    expect(spy).toHaveBeenCalled();

  }));

  it('get username accesses the localstorage', () => {
    //clean cache on entry
    localStorage.setItem('ssoUser', '');

    let initString = localStorage.getItem('ssoUser');
    initString = initString ? initString : '';
    expect(service.getUsername() === initString).toBeTruthy();

    localStorage.setItem('ssoUser', '{"email": "myName"}');
    initString = <string>localStorage.getItem('ssoUser');
    expect(service.getUsername() === 'myName').toBeTruthy();

    //clean the cache for other tests
    localStorage.setItem('ssoUser', '');
  });
});
