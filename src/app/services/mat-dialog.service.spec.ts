import { OverlayRef } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef, ElementRef, EmbeddedViewRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, _MatDialogContainerBase } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MatDialogService } from './mat-dialog.service';

const MockDialogService = {
  open(TemplateRef: any){

  },
  closeDialog(){

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

describe('MatDialogService', () => {
  let service: MatDialogService;
  let dService: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
        {
          provide: MatDialog,
          useValue: MockDialogService
        }
      ],
    });
    service = TestBed.inject(MatDialogService);
    dService = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Open/close should work on service', () => {
    let spy = spyOn(dService, 'open').and.callThrough();

    service.openDialog(new MockTemplateRef());
    expect(spy).toHaveBeenCalled();
    service.openDialogLarge(new MockTemplateRef());
    expect(spy).toHaveBeenCalled();
    service.openDialogTall(new MockTemplateRef());
    expect(spy).toHaveBeenCalled();
    service.openDialogSmall(new MockTemplateRef());
    expect(spy).toHaveBeenCalled();


  })
});
