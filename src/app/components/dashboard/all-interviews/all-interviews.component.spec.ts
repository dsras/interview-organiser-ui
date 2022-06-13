import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AllInterviewsComponent } from './all-interviews.component';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InterviewReturn } from 'src/app/shared/models/types';


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

const MockIRequesterService = {
  getAllInterviews(){
    return of([new InterviewReturn(10,['1', '2'], '2022-06-01', '19:00', '20:00', 'ahasf','Completed','Hired', 'Me')])
  }
}

describe('AllInterviewsComponent', () => {
  let component: AllInterviewsComponent;
  let fixture: ComponentFixture<AllInterviewsComponent>;
  let iService: InterviewRequesterService;
  let mockMService: any;
  let iSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        MatDialogModule
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,       
        //ModalControllerService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: InterviewRequesterService,
          useValue: MockIRequesterService
        },
        MatDialogService,
       
      ],
      declarations: [ AllInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterviewsComponent);
    iService = TestBed.inject(InterviewRequesterService);
    mockMService = TestBed.inject(MatDialogService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('ngOnInit should call API request', () => {
    iSpy = spyOn(iService, 'getAllInterviews').and.returnValue(of([]));
    component.ngOnInit();
    expect(iSpy).toHaveBeenCalled();
  });
  
  it('openModal should call open template', () => {
    iSpy = spyOn(mockMService, 'openDialog').and.returnValue('');
    component.openModal(new MockTemplateRef());
    expect(iSpy).toHaveBeenCalled();
  });  

  it('close modal should call close template', () => {
    iSpy = spyOn(mockMService, 'closeDialog').and.callThrough();
    component.closeModal();
    expect(iSpy).toHaveBeenCalled();
  });
});
