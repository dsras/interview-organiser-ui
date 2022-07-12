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
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarUpdaterService } from 'src/app/services/calendar-updater.service';
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
  @Output() tabChangeEvent: EventEmitter<any> = new EventEmitter();

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
    'status',
  ];
  iDisplayedColumnsRec: Array<string> = [
    'InterviewId',
    'date',
    'time',
    'name',
    'delete',
    // 'outcome',
    'status',
  ];
  iDisplayedColumns: Array<string> = [];
  displayedColumns: Array<string> = [];
  expandedAvailability!: CalendarEventAvailability | null;
  expandedInterview!: CalendarEventAvailability | null;

  deleteCount = 0;
  /** @ignore test method to be removed when completed */
  message(text: string): void {
    console.log(text);
  }

  ngOnInit() {
    this.deleteCount = 0;
    this.iDisplayedColumns = this.isRecruiter
      ? this.iDisplayedColumnsRec
      : this.iDisplayedColumnsUser;
    this.displayedColumns = this.isRecruiter
      ? this.displayedColumnsRec
      : this.displayedColumnsUser;

    if (this.userRoles.includes('RECRUITER')) {
      this.recAuth = true;
      console.log('rec true');
    }
  }

  ngAfterViewInit() {
    this.aTable = new MatTableDataSource(this.availability);
    this.aTable.paginator = this.aPaginator;
    this.iTable = new MatTableDataSource(this.interviews);
    this.iTable.paginator = this.iPaginator;
  }

  /** @ignore */
  constructor(
    private aRequester: AvailabilityRequesterService,
    private updater: CalendarUpdaterService,
    private iRequester: InterviewRequesterService
  ) {}

  onDelete(id: string | number | any) {
    console.log(id);
    this.aRequester.deleteAvailability(id).subscribe(() => {
      this.updater.updateCalendar();
      this.deleteCount++;
    });
  }

  updateInterviews(){

  }

  tabChange(): void {
    this.tabChangeEvent.emit();
  }

  onIDelete(id: string | number | any) {
    console.log(id);
    this.iRequester.deleteInterviewRecompAvails(id).subscribe(() => {
      this.updater.updateCalendar();
    });
  }
}
