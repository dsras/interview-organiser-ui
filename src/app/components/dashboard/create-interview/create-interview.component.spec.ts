import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef, ElementRef, EmbeddedViewRef } from '@angular/core';
import { ComponentFixture, resetFakeAsyncZone, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

import { CreateInterviewComponent } from './create-interview.component';

const ModalControllerServiceStub  = {
  openModal(template: TemplateRef<any>) {
    return of("complete");
  },

  openModalLg(template: TemplateRef<any>) {
    return of("complete");
  },

  closeModal() {
    return of("complete");
  }
}

class MockTemplateRef extends TemplateRef<any>{
  constructor(){
    super();
  }
  get elementRef(): ElementRef<any> {
    throw new Error('Method not implemented.');
  }
  createEmbeddedView(context: any): EmbeddedViewRef<any> {
    throw new Error('Method not implemented.');
  }

}

const dummyFindForm = {
  value: {
    dateRange: [
      new Date(),
      new Date(),
    ],
    startTime: new Date(),
    endTime: new Date(),
    skills: {
      skillType: 'Java',
      skillLevel: 'Junior'
    }
  },
  reset(){}
}

const dummySubmitForm = {
  value: {
    startTime: new Date(),
    interviewSelected: "an interview",
    additional: "Additional",
  },
  reset(){}
}
describe('FindInterviewComponent', () => {
  let component: CreateInterviewComponent;
  let fixture: ComponentFixture<CreateInterviewComponent>;
  let aService: AvailabilityRequesterService;
  let aSpy: any;
  let iService: InterviewRequesterService;
  let iSpy: any;
  let mockMService: any;

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
        {provide: ModalControllerService, useValue: ModalControllerServiceStub},
          
      ],
      declarations: [ CreateInterviewComponent ]
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterviewComponent);
    iService = TestBed.inject(InterviewRequesterService);
    aService = TestBed.inject(AvailabilityRequesterService);
    mockMService = TestBed.inject(ModalControllerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('find interview makes service calls', () =>{
    aSpy = spyOn(aService, 'getAvailabilityByRange').and.callThrough();
    let formG = dummyFindForm;
    component.findInterview(formG);
    expect(aService.getAvailabilityByRange).toHaveBeenCalled();

    component.skillsAvailable.push({
      id:0,
      skillLevel: 'Junior',
      skillName: 'Java'
     });

    component.findInterview(formG);
    expect(aService.getAvailabilityByRange).toHaveBeenCalled();
  });
  
  it('submit interview makes service calls', () =>{
    iSpy = spyOn(iService, 'addInterviewForm').and.callThrough();
    let formG = dummySubmitForm;
    component.submitInterview(formG);
    expect(iService.addInterviewForm).toHaveBeenCalled();
  });
  
  it('openModal should call open template', () => {
    iSpy = spyOn(mockMService, 'openModal').and.callThrough();
    component.openModal(new MockTemplateRef());
    expect(mockMService.openModal).toHaveBeenCalled();
  });  

  it('close modal should call close template', () => {
    iSpy = spyOn(mockMService, 'closeModal').and.callThrough();
    component.closeModal();
    expect(mockMService.closeModal).toHaveBeenCalled();
  });

});
