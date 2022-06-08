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
import { AvailabilityTableData, InterviewTableData, InterviewTableDisplayData } from 'src/app/shared/models/table-data';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

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
export class ViewAvailabilityComponent implements OnInit{
  /** Availabilty list for the day */
  @Input() availability: Array<CalendarEventAvailability> = [];
  /** Interview list for the day */
  @Input() interviews: Array<CalendarEventInterview> = [];
  @Input() userRoles: Array<string> = [];
  @Input() callbackFunction!: (args: any) => void;
  recAuth: boolean = false;  
  tableData: AvailabilityTableData = new AvailabilityTableData(this.availability);
  iTableData: InterviewTableDisplayData = new InterviewTableDisplayData(this.interviews);


  displayedColumns: Array<string> = [
    'AvailabilityId',
    'date',
    'time',
    'delete'
    // 'outcome',
    // 'status',
  ]; 
  iDisplayedColumns: Array<string> = [
    'InterviewId',
    'date',
    'time'
    // 'outcome',
    // 'status',
  ];
  expandedAvailability!: CalendarEventAvailability | null;
  expandedInterview!: CalendarEventAvailability | null;
  /** @ignore test method to be removed when completed */
  message(text: string): void {
    console.log(text);
  }

  ngOnInit(){
    this.getAvailability();
    if (this.userRoles.includes('RECRUITER')) {
      this.recAuth = true;
      console.log('rec true');
    }  
    if(this.recAuth){
      this.iDisplayedColumns = [    
        'InterviewId',
        'date',
        'time',
        'delete'
      ]

    }
  }
  /** Request table data from the database */
  getAvailability(): void {
    this.tableData.setData(this.availability);
    this.iTableData.setData(this.interviews);
  }

  /** @ignore */
  constructor(
    private ar: AvailabilityRequesterService, 
    private dt: DateToStringService,
    private _dialog: MatDialogService
    ) {}
  onDelete(id: string | number | any){
    console.log(id);
    this.ar.deleteAvailability(id);
    this.callbackFunction([]);
  }

}
