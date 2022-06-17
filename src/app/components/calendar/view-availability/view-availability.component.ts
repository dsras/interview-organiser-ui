import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import {
  AvailabilityTableData,
  InterviewTableDisplayData,
} from 'src/app/shared/models/table-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

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
export class ViewAvailabilityComponent implements OnInit {
  /** Availabilty list for the day */
  @Input() availability: Array<CalendarEventAvailability> = [];
  /** Interview list for the day */
  @Input() interviews: Array<CalendarEventInterview> = [];

  @Input() userRoles: Array<string> = [];
  @Output() callbackEmitter: EventEmitter<any> = new EventEmitter();

  @Input() isRecruiter: boolean = false;

  @ViewChild('aPaginator') aPaginator!: MatPaginator;
  @ViewChild('iPaginator') iPaginator!: MatPaginator;

  recAuth: boolean = false;


  aTable!: MatTableDataSource<CalendarEventAvailability>;
  iTable!: MatTableDataSource<CalendarEventInterview>;


  displayedColumnsUser: Array<string> = [
    'AvailabilityId',
    'date',
    'time',
    'delete',
    // 'outcome',
    // 'status',
  ];

  displayedColumnsRec: Array<string> = [
    'AvailabilityId',
    'date',
    'time',
    'name',
    // 'outcome',
    // 'status',
  ];
  iDisplayedColumnsUser: Array<string> = [
    'InterviewId',
    'date',
    'time',
    // 'outcome',
    // 'status',
  ];
  iDisplayedColumnsRec: Array<string> = [
    'InterviewId',
    'date',
    'time',
    'name',
    'delete',
    // 'outcome',
    // 'status',
  ];
  iDisplayedColumns: Array<string> = [];
  displayedColumns: Array<string> = [];
  expandedAvailability!: CalendarEventAvailability | null;
  expandedInterview!: CalendarEventAvailability | null;
  /** @ignore test method to be removed when completed */
  message(text: string): void {
    console.log(text);
  }

  ngOnInit() {
    this.iDisplayedColumns = this.isRecruiter
      ? this.iDisplayedColumnsRec
      : this.iDisplayedColumnsUser;
    this.displayedColumns = this.isRecruiter
      ? this.displayedColumnsRec
      : this.displayedColumnsUser;

      console.log('is recruiter: ' + (this.isRecruiter?'true':'false'));
  }

  ngAfterViewInit() {
    this.aTable = new MatTableDataSource(this.availability)
    this.aTable.paginator = this.aPaginator
    this.iTable = new MatTableDataSource(this.interviews)
    this.iTable.paginator = this.iPaginator
  }

  /** Request table data from the database */
  // getAvailability(): void {
  //   this.aTableData.setData(this.availability);
  //   this.iTableData.setData(this.interviews);
  // }

  /** @ignore */
  constructor(
    private ar: AvailabilityRequesterService,
    private ir: InterviewRequesterService
    ) {}

  onDelete(id: string | number | any) {
    console.log(id);
    this.ar.deleteAvailability(id).subscribe(() => {
      this.callbackEmitter.emit();
    });
  }
  onIDelete(id: string | number | any) {
    console.log(id);
    this.ir.deleteInterviewRecompAvails(id).subscribe(() => {
      this.callbackEmitter.emit();
    });
  }
}
