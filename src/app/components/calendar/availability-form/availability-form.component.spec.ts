import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef, ElementRef, EmbeddedViewRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

import { AvailabilityFormComponent } from './availability-form.component';
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
  let dService: MatDialogService;

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
        MatDialog,
        Overlay,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        MatDialogService
      ],
      declarations: [ AvailabilityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityFormComponent);
    component = fixture.componentInstance;
    aService = TestBed.inject(AvailabilityRequesterService);
    dService = TestBed.inject(MatDialogService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Submit should call service methods', () => {
    let aSpy = spyOn(aService, 'addAvailability').and.callThrough();
    let formG = dummyAvailForm;
    component.onSubmit(<FormGroup>formG);
    expect(aSpy).toHaveBeenCalled();
  });

    
  it('openModal should call open template', () => {
    let Spy = spyOn(dService, 'openDialog').and.returnValue();
    component.openDialog(new MockTemplateRef());
    expect(Spy).toHaveBeenCalled();
  });  

    
  it('closeDialog should call service methods', () => {
    let Spy = spyOn(dService, 'closeDialog').and.callThrough();
    component.closeDialog();
    expect(Spy).toHaveBeenCalled();
  });
});
