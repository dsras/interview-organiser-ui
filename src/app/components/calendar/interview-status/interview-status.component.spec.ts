import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, resetFakeAsyncZone, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

import { InterviewStatusComponent } from './interview-status.component';


const dummyStatusForm = {
  value: {
    status: "Completed",
  },
  reset(){

  }
}


describe('InterviewStatusComponent', () => {
  let component: InterviewStatusComponent;
  let fixture: ComponentFixture<InterviewStatusComponent>;
  let iService: InterviewRequesterService;
  let iSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule

      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder

      ],
      declarations: [ InterviewStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewStatusComponent);
    iService = TestBed.inject(InterviewRequesterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Submit should call service methods', () => {
    iSpy = spyOn(iService, 'updateInterviewStatus').and.callThrough();
    let formG = dummyStatusForm;
    component.onSubmit(<FormGroup>formG);
    expect(iService.updateInterviewStatus).toHaveBeenCalled();
  })
});
