import { Component, OnInit, Input } from '@angular/core';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';

/**
 * Component that displays when a day is clicked on the calendar.
 *
 * Populates arrays from parent component
 */
@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss'],
})
export class ViewAvailabilityComponent {
  /** Availabilty list for the day */
  @Input() availability: Array<CalendarEventAvailability> = [];
  /** Interview list for the day */
  @Input() interviews: Array<CalendarEventInterview> = [];

  /** @ignore */
  constructor(private ar: AvailabilityRequesterService) {}
  onDelete(id: string | number | any){
    console.log(id);
    this.ar.deleteAvailability(id);
  }
}
