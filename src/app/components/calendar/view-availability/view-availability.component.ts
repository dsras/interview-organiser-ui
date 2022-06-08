import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { StringToDatetimePipe } from 'src/app/pipes/string-to-datetime.pipe';
import { DateToTimePipe } from 'src/app/pipes/DateToTimePipe';
import { DateToStringService } from 'src/app/services/date-to-string.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { getUsername } from 'src/app/shared/functions/get-user-from-local.function';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import { AvailabilityTableData } from 'src/app/shared/models/table-data';

/**
 * Component that displays when a day is clicked on the calendar.
 *
 * Populates arrays from parent component
 */
@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ViewAvailabilityComponent {
  /** Availabilty list for the day */
  @Input() availability: Array<CalendarEventAvailability> = [];
  /** Interview list for the day */
  @Input() interviews: Array<CalendarEventInterview> = [];

  tableData: AvailabilityTableData = new AvailabilityTableData(this.availability);

  displayedColumns: Array<string> = [
    'AvailabilityId',
    'date',
    'time',
    'delete'
    // 'outcome',
    // 'status',
  ];
  expandedAvailability!: CalendarEventAvailability | null;
  /** @ignore test method to be removed when completed */
  message(text: string): void {
    console.log(text);
  }

  ngOnInit(){
    this.getAvailability();
  }
  /** Request table data from the database */
  getAvailability(): void {
    let events: CalendarEvent [];
    this.tableData.setData(this.availability);
  }

  /** @ignore */
  constructor(private ar: AvailabilityRequesterService, private dt: DateToStringService) {}
  onDelete(id: string | number | any){
    console.log(id);
    this.ar.deleteAvailability(id);
  }
}
