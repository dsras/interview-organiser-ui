import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

import { InterviewOverviewComponent } from './interview-overview.component';

const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}

describe('InterviewOverviewComponent', () => {
  let component: InterviewOverviewComponent;
  let fixture: ComponentFixture<InterviewOverviewComponent>;
  let uService: GetUserDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        MatDialogModule
      ],
      declarations: [ 
        InterviewOverviewComponent 
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder, 
        MatDialogService,
        {
          provide: GetUserDataService,
          useValue: FakeUserDataService
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewOverviewComponent);
    uService = TestBed.inject(GetUserDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
