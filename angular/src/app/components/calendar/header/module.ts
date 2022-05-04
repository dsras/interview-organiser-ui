import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calHead.component';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent],
})
export class calHeadModule {}
