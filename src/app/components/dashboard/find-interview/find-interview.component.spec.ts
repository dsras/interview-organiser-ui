import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

import { FindInterviewComponent } from './find-interview.component';

describe('CreateInterviewComponent', () => {
  let component: FindInterviewComponent;
  let fixture: ComponentFixture<FindInterviewComponent>;
  let aService: AvailabilityRequesterService;
  let aSpy: any;
  let iService: InterviewRequesterService;
  let iSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [ FindInterviewComponent ]
    })
    .compileComponents();

    iService = TestBed.inject(InterviewRequesterService);
    aService = TestBed.inject(AvailabilityRequesterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('find interview makes service calls', () =>{
    aSpy = spyOn(aService, 'getAvailabilityByRange').and.callThrough();
    let formG = new FormGroup({});
    component.findInterview(formG);
    expect(aService.getAvailabilityByRange).toHaveBeenCalled();
  });
  
  it('submit interview makes service calls', () =>{
    iSpy = spyOn(iService, 'addInterviewForm').and.callThrough();
    let formG = new FormGroup({});
    component.submitInterview(formG);
    expect(iService.addInterviewForm).toHaveBeenCalled();
  });
  
});
