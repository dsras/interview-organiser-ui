import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInterviewsComponent } from './view-interviews/view-interviews.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [ViewInterviewsComponent],
  imports: [CommonModule, TimepickerModule, BsDatepickerModule],
  exports: [ViewInterviewsComponent, TimepickerModule, BsDatepickerModule],
})
export class SharedModule {}
