import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MatDialogService } from './mat-dialog.service';

describe('MatDialogService', () => {
  let service: MatDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        //ModalControllerService,
        MatDialog,
      ],
    });
    service = TestBed.inject(MatDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
