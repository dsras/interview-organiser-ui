import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

import { ViewAvailabilityComponent } from './view-availability.component';

describe('ViewAvailabilityModalComponent', () => {
  let component: ViewAvailabilityComponent;
  let fixture: ComponentFixture<ViewAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        ModalModule.forRoot(),
        MatDialogModule,

      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,        
        {
          provide: MatDialogRef,
          useValue: {}
        },
        MatDialogService,      
      ],
      declarations: [ ViewAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no other tests available');
});
