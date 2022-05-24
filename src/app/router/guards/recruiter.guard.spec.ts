import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserData } from 'src/app/shared/models/types';

import { RecruiterGuard } from './recruiter.guard';
const fakeRouter = {
  navigate(input: Array<any>){
    return <Promise<void>>input[0];
  }
}
describe('RecruiterGuard', () => {
  let guard: RecruiterGuard;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports:[
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ],
    providers: [
      {provide: Router, useValue: fakeRouter},
      BsModalService,
      DatePipe,
      FormBuilder, 
           
    ],});
    guard = TestBed.inject(RecruiterGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  
  it('can activate calls through', () => {
    let rSpy = spyOn(router, 'navigate').and.callThrough();
    localStorage.clear();
    guard.canActivate();
    expect(rSpy).toHaveBeenCalledTimes(1);

    localStorage.setItem('userData', JSON.stringify({roles: [{name: 'RECRUITER'}]}));
    guard.canActivate();
    expect(rSpy).toHaveBeenCalledTimes(1);

    localStorage.clear();
  });
});
