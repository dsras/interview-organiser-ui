import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef, ElementRef, EmbeddedViewRef } from '@angular/core';
import { ComponentFixture, resetFakeAsyncZone, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

import { CreateInterviewComponent } from './create-interview.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvailabilityForInterviews } from 'src/app/shared/models/types';

const MockRequestCenterService = {
  getAllSkills(){
    return '';
  }
}

const MockaRequestCenterService = {
  getSlots(){
    return of('');
  },

}

const MockiRequesterService = {
  addInterviewForm(){
    return of('');
  }
}

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
describe('Create Interview Component', () => {
  let component: CreateInterviewComponent;
  let fixture: ComponentFixture<CreateInterviewComponent>;
  let aService: AvailabilityRequesterService;
  let mService: MatDialogService;

  let aSpy: any;
  let iService: InterviewRequesterService;
  let iSpy: any;
  let rService: any;
  let dService: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,    
        MatDialogService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: RequestCenterService,
          useValue: MockRequestCenterService
        },
        {
          provide: AvailabilityRequesterService,
          useValue: MockaRequestCenterService
        },
        {
          provide: InterviewRequesterService,
          useValue: MockiRequesterService
        }


      ],
      declarations: [ CreateInterviewComponent ]
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterviewComponent);
    iService = TestBed.inject(InterviewRequesterService);
    aService = TestBed.inject(AvailabilityRequesterService);
    rService = TestBed.inject(RequestCenterService);
    dService = TestBed.inject(MatDialogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let spy = spyOn(rService, 'getAllSkills').and.callThrough();
    expect(component).toBeTruthy();
  });

  it('find interview makes service calls', () =>{
    aSpy = spyOn(aService, 'getSlots').and.returnValue(of([<AvailabilityForInterviews>{
      startTime: '19:00',
      endTime: '20:00'
    }]));
    let formG = <FormGroup> dummyFindForm;
    component.findInterview(formG);
    expect(aSpy).toHaveBeenCalled();

    component.skillsAvailable.push({
      id:0,
      skillLevel: 'Junior',
      skillName: 'Java'
     });

    component.findInterview(formG);
    expect(aSpy).toHaveBeenCalled();
  });
  
  it('submit interview makes service calls', () =>{
    iSpy = spyOn(iService, 'addInterviewForm').and.callThrough();
    let formG = <FormGroup>dummySubmitForm;
    component.submitInterview(formG);
    expect(iSpy).toHaveBeenCalled();
  });
  
  it('openModal should call open template', () => {
    iSpy = spyOn(dService, 'openDialogTall').and.returnValue('');
    component.openModal(new MockTemplateRef());
    expect(iSpy).toHaveBeenCalled();
  });  

  it('close modal should call close template', () => {
    iSpy = spyOn(dService, 'closeDialog').and.callThrough();
    component.closeModal();
    expect(iSpy).toHaveBeenCalled();
  });

});
