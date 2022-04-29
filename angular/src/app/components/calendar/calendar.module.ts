import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar.component';
import { AvailabilityFormComponent } from './availability-form/availability-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { ViewAvailabilityComponent } from './view-availability-modal/view-availability.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    TimepickerModule,
    BsDatepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    CalendarComponent,
    AvailabilityFormComponent,
    SkillsFormComponent,
    ViewAvailabilityComponent,
    InterviewStatusComponent],
  exports: [CalendarComponent],
})
export class MyCalendarModule { }