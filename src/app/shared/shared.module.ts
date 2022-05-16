import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { getTimepickerConfig } from './functions/get-timepicker-config';


@NgModule({
  imports: [CommonModule, TimepickerModule, BsDatepickerModule],
  exports: [TimepickerModule, BsDatepickerModule],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class SharedModule {}
