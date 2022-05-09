import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar.component';
import { AvailabilityFormComponent } from './availability-form/availability-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { ViewAvailabilityComponent } from './view-availability/view-availability.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CalendarComponent,
    AvailabilityFormComponent,
    SkillsFormComponent,
    ViewAvailabilityComponent,
    InterviewStatusComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
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
  exports: [CalendarComponent],
})
export class MyCalendarModule {}
