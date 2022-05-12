import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AllInterviewsComponent } from './all-interviews.component';

describe('AllInterviewsComponent', () => {
  let component: AllInterviewsComponent;
  let fixture: ComponentFixture<AllInterviewsComponent>;
  let iService: InterviewRequesterService;
  let mService: ModalControllerService;
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
      declarations: [ AllInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterviewsComponent);
    iService = TestBed.inject(InterviewRequesterService);
    mService = TestBed.inject(ModalControllerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call API request', () => {
    iSpy = spyOn(iService, 'getInterviewsDashboard').and.callThrough();
    component.ngOnInit();
    expect(iService.getInterviewsDashboard).toHaveBeenCalled();
  });
  
  //! need to spoof the modal template
  // it('openModal should call open template', () => {
  //   iSpy = spyOn(mService, 'openModal').and.callThrough();
  //   let myRef = ;
  //   component.openModal(myRef);
  //   expect(mService.openModal).toHaveBeenCalled();
  // });  

  it('openModal should call open template', () => {
    iSpy = spyOn(mService, 'closeModal').and.callThrough();
    component.closeModal();
    expect(mService.closeModal).toHaveBeenCalled();
  });
});
