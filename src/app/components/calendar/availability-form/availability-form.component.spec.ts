import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

import { AvailabilityFormComponent } from './availability-form.component';


const dummyAvailForm = {
  value: {
    dateRange: [
      new Date(),
      new Date()
    ],
    startTime: new Date(),
    endTime: new Date()
  },
  reset(){}
}

describe('AvailabilityFormComponent', () => {
  let component: AvailabilityFormComponent;
  let fixture: ComponentFixture<AvailabilityFormComponent>;
  let aService: AvailabilityRequesterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        MatDialogModule,
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,              
        MatDialog,
        Overlay,
      ],
      declarations: [ AvailabilityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityFormComponent);
    component = fixture.componentInstance;
    aService = TestBed.inject(AvailabilityRequesterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Submit should call service methods', () => {
    let aSpy = spyOn(aService, 'addAvailability').and.callThrough();
    let formG = dummyAvailForm;
    component.onSubmit(formG);
    expect(aService.addAvailability).toHaveBeenCalled();
  })
});
