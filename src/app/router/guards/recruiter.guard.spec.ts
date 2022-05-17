import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';

import { RecruiterGuard } from './recruiter.guard';

describe('RecruiterGuard', () => {
  let guard: RecruiterGuard;

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
           
    ],});
    guard = TestBed.inject(RecruiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
