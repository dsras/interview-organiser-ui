import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { of } from 'rxjs';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { InterviewReturn } from 'src/app/shared/models/types';

import { CompletedInterviewsComponent } from './completed-interviews.component';

const MockIRequesterService = {
  getAllInterviews(){
    return of([new InterviewReturn(10,['1', '2'], '2022-06-01', '19:00', '20:00', 'ahasf','Completed','Hired', 'Me')])
  }
}

describe('CompletedInterviewsComponent', () => {
  let component: CompletedInterviewsComponent;
  let fixture: ComponentFixture<CompletedInterviewsComponent>;
  let mockMService: any;
  let mockIService: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

      ],
      declarations: [ 
        CompletedInterviewsComponent 
      ],
      providers: [
        DatePipe,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: InterviewRequesterService,
          useValue: MockIRequesterService
        },
        MatDialogService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedInterviewsComponent);
    mockMService = TestBed.inject(MatDialogService);
    mockIService = TestBed.inject(InterviewRequesterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let spy = spyOn(mockIService, 'getAllInterviews').and.callThrough();
    expect(component).toBeTruthy();
  });
});
