import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventAvailability, CalendarEventInterview } from 'src/app/common/models/calendar-event-detail';


@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityComponent implements OnInit {

  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() availability: Array<CalendarEventAvailability> = []
  @Input() interviews: Array<CalendarEventInterview> = []


  ngOnInit(): void {
  }
  action = new Subject<any>();

  constructor() {
  }

}