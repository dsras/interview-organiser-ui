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

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,
        //RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        RouterTestingModule.withRoutes(
          [
            {path: 'add', component: CalendarComponent, pathMatch: 'full'}
          ]
        )
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,     
        Location
      ],
      declarations: [ CalendarComponent ]
    })
    .compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CalendarComponent);
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

  it('navigate to "input" redirects you to /input', fakeAsync(() => { 
    expect(location.path()).toBe('/login');

    component.redirect("Dashboard")
    tick();
    expect(location.path()).toBe('/Dashboard');
  }));
});
