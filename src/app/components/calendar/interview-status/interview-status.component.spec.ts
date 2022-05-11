import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

import { InterviewStatusComponent } from './interview-status.component';


const dummyStatusForm = {
  value: {
    firstDate: new Date(),
    lastDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    skills: {
      skillType: 'Java',
      skillLevel: 'Junior'
    }
  }
}


describe('InterviewStatusComponent', () => {
  let component: InterviewStatusComponent;
  let fixture: ComponentFixture<InterviewStatusComponent>;
  let iService: InterviewRequesterService;

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
    let iSpy = spyOn(iService, 'updateInterviewStatus').and.callThrough();
    let formG = dummyStatusForm;
    //component.onSubmit(formG);
    expect(iService.updateInterviewStatus).toHaveBeenCalled();
  })
});
