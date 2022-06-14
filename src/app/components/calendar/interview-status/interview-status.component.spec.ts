import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, resetFakeAsyncZone, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

import { InterviewStatusComponent } from './interview-status.component';


const dummyStatusForm = {
  value: {
    status: "Completed",
  },
  reset(){

  }
}
const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}

describe('InterviewStatusComponent', () => {
  let component: InterviewStatusComponent;
  let fixture: ComponentFixture<InterviewStatusComponent>;
  let iService: InterviewRequesterService;
  let uService: GetUserDataService;
  let iSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule

      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: GetUserDataService,
          useValue: FakeUserDataService
        },
        MatDialogService,

      ],
      declarations: [ InterviewStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewStatusComponent);
    iService = TestBed.inject(InterviewRequesterService);
    uService = TestBed.inject(GetUserDataService);
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
