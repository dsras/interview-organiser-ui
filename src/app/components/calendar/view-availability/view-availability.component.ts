import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/common/models/calendar-event-detail';

@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss'],
})
export class ViewAvailabilityComponent implements OnInit {
  @Input() availability: Array<CalendarEventAvailability> = [];
  @Input() interviews: Array<CalendarEventInterview> = [];

  ngOnInit(): void {}
  action = new Subject<any>();

  constructor() {}
}
