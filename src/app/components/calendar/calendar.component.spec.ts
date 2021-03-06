import { DatePipe, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CalendarDateFormatter, CalendarEvent, CalendarModule, CalendarView, DateAdapter } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Router } from '@angular/router';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { CalendarEventAvailability, CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { InterviewMetaData } from 'src/app/shared/models/event-meta-data';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}


describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let location: Location;
  let router: Router;
  let aService: AvailabilityRequesterService;
  let iService: InterviewRequesterService;
  let mService: MatDialogService;
  let uService: GetUserDataService;
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
        MatDialogModule,
        BrowserAnimationsModule
        
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,     
        Location,
        InterviewRequesterService,
        AvailabilityRequesterService,
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
      declarations: [ CalendarComponent ]
    })
    .compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CalendarComponent);
    aService = TestBed.inject(AvailabilityRequesterService);
    iService = TestBed.inject(InterviewRequesterService);
    mService = TestBed.inject(MatDialogService);
    uService = TestBed.inject(GetUserDataService);
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
    component.userRoles=['USER'];
    let spy = spyOn(component, 'resetEvents').and.callThrough()
    aSpy = spyOn(aService, 'getMyAvailabilityInRange').and.callThrough();
    iSpy = spyOn(iService, 'getInterviewsPerMonthByInterviewer').and.callThrough();
    component.populateCalendar();
    expect(spy).toHaveBeenCalled();
    expect(aSpy).toHaveBeenCalled();
    expect(iSpy).toHaveBeenCalled();

    component.userRoles=['RECRUITER'];
    aSpy = spyOn(aService, 'getRecruiterAvailability').and.callThrough();
    component.populateCalendar();
    expect(aSpy).toHaveBeenCalled();
    expect(iSpy).toHaveBeenCalled();

    component.userRoles=['ADMIN'];
    let spy2 = spyOn(component, 'initAdmin').and.callThrough()
    component.populateCalendar();
    expect(spy2).toHaveBeenCalled();
  });

  it('delayed refresh should sleep and refresh', fakeAsync(() => {
    let spy = spyOn(component, 'sleep').and.callThrough();
    let rSpy = spyOn(component.refresh, 'next').and.callThrough();
    component.delayedRefresh();
    tick(3000);
    expect(spy).toHaveBeenCalled();
    expect(rSpy).toHaveBeenCalled();
  }));


  it('open day modal should open the correct date', () => {
    aSpy = spyOn(component.dayAvailability, 'push').and.callThrough();
    let bSpy = spyOn(component.dayInterviews, 'push').and.callThrough();
    let cSpy = spyOn(mService, 'openDialogLarge').and.callThrough();
    let myDate = new Date();
    let myEvent = <CalendarEvent> {
      start: myDate,
      title: "title",
    }
    component.availability.push(new CalendarEventAvailability(myEvent));
    component.interviews.push(new CalendarEventInterview(myEvent, <InterviewMetaData>{}));
    component.openDayModal(myDate);
    expect(component.availability.length != 0).toBeTruthy();
    expect(component.interviews.length != 0).toBeTruthy();
    expect(cSpy).toHaveBeenCalled();
  });

  it('dayClicked should attempt open modal', () => {
    let rSpy = spyOn(component, 'openDayModal').and.callThrough();
    
    let date = new Date();
    let myEvent = <CalendarEvent> {
      start: date,
      title: "title",
    }
    let events: CalendarEvent[] = [myEvent];
    component.dayClicked({date, events});
    expect(component.openDayModal).toHaveBeenCalled();
  });

  it('setView should update the view', () => {
    let newView = CalendarView.Month;
    component.setView(newView);
    expect(component.view == newView).toBeTruthy();
    newView = CalendarView.Week;
    component.setView(newView);
    expect(component.view == newView).toBeTruthy();
    newView = CalendarView.Day;
    component.setView(newView);
    expect(component.view == newView).toBeTruthy();
  });

  it('closeDayModal should make isopen false', () => {
    component.closeOpenMonthViewDay();
    expect(component.activeDayIsOpen == false).toBeTruthy();
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
