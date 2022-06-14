import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarMonthViewComponent, CalendarView } from 'angular-calendar';

/** @ignore */
@Component({
  selector: 'calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date = new Date();

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
