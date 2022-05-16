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
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AllInterviewsComponent } from './all-interviews.component';


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

describe('AllInterviewsComponent', () => {
  let component: AllInterviewsComponent;
  let fixture: ComponentFixture<AllInterviewsComponent>;
  let iService: InterviewRequesterService;
  let mService: ModalControllerService;
  let mockMService: any;
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
        //ModalControllerService,
        {provide: ModalControllerService, useValue: ModalControllerServiceStub},
       
      ],
      declarations: [ AllInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterviewsComponent);
    iService = TestBed.inject(InterviewRequesterService);
    mService = TestBed.inject(ModalControllerService);
    mockMService = TestBed.inject(ModalControllerService);
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
