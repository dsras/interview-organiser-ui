import { DatePipe } from '@angular/common';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { retry } from 'rxjs';
import { Requester } from './requester.service';

//? Come back to this as its quite confusing to test, lots of HTTP spoofing needed.

describe('RequesterService', () => {
  let service: Requester;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      ],
    });
    service = TestBed.inject(Requester);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should be called', fakeAsync(() => {
    let url = "https://webhook.site/a87ad00e-b0e3-4f81-9673-261fc569a531";
    service.getRequest<string>(url).subscribe(returnData => {
      console.log(returnData);
      expect(returnData).toBeDefined();
    })
    tick(3);
    const req = httpTestingController.expectOne({
      method: 'GET',  // find open Http request that is a get request.
   });
  }));
  
  it('post should be called', fakeAsync(() => {
    let url = "https://eosajx3tbq8buv5.m.pipedream.net";
    let out: any;
    service.postRequest<string>(url, "testString").subscribe(returnData => {
      out = returnData;
      expect(out).toBeDefined();
    })
    tick(3);
    const req = httpTestingController.expectOne({
      method: 'POST',  // find open Http request that is a get request.
   });
  }));
  

});
