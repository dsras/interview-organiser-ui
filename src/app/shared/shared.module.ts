import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInterviewsComponent } from './components/view-interviews/view-interviews.component';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { getTimepickerConfig } from './functions/get-timepicker-config';

@NgModule({
  declarations: [ViewInterviewsComponent],
  imports: [CommonModule, TimepickerModule, BsDatepickerModule],
  exports: [ViewInterviewsComponent, TimepickerModule, BsDatepickerModule],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],

})
export class SharedModule {}
