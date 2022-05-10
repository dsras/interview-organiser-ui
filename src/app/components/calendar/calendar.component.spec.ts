import { DatePipe, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Router } from '@angular/router';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let location: Location;
  let router: Router;
  let aService: AvailabilityRequesterService;
  let iService: InterviewRequesterService;
  let iSpy: any;
  let aSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        RouterTestingModule.withRoutes(
          [
            {path: 'add', component: CalendarComponent, pathMatch: 'full'}
          ]
        ),
        
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,     
        Location,
        InterviewRequesterService,
        AvailabilityRequesterService
      ],
      declarations: [ CalendarComponent ]
    })
    .compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CalendarComponent);
    aService = TestBed.inject(AvailabilityRequesterService);
    iService = TestBed.inject(InterviewRequesterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('events should clear', () => { 
    component.resetEvents();
    expect(component.events.length == 0).toBeTruthy();
    expect(component.availability.length == 0).toBeTruthy();
    expect(component.interviews.length == 0).toBeTruthy();
  });

  it('populate should call service methods', () => { 
    let spy = spyOn(component, 'resetEvents').and.callThrough()
    iSpy = spyOn(iService, 'getInterviewByInterviewer').and.callThrough();
    aSpy = spyOn(aService, 'getMyAvailability').and.callThrough();
    component.populateCalendar();
    expect(iService.getInterviewByInterviewer).toHaveBeenCalled();
    expect(aService.getMyAvailability).toHaveBeenCalled();
    expect(component.resetEvents).toHaveBeenCalled();
  });

  it('delayed refresh should sleep', () => {
    let spy = spyOn(component, 'sleep').and.callThrough();
    component.delayedRefresh();
    expect(component.sleep).toHaveBeenCalled();
  });

  // //! not working yet, maybe requires a specific router component to do this type of route testing.
  // it('navigate to "input" redirects you to /input', fakeAsync(() => { 
  //   console.log("Location 1: " + router.url.toString());
  //   console.log("Location 1: " + location.path());

  //   router.config.forEach(ele =>
  //     console.log(ele)
  //   );
  //   console.log(router.config[0].component?.name);
  //   component.redirect('dashboard');
  //   console.log(router.config[0].component?.name)
  //   console.log("Location 2: " + router.url.toString());
  //   console.log("Location 2: " + location.path());

  //   //expect(location.path()).toBe('/dashboard');


  // }));


});
