import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import {
  getUsername,
  getUserRoleNames,
} from 'src/app/shared/functions/get-user-from-local.function';

/**
 * The main component of the calendar, an implementation of angular-calendar
 * {@link https://mattlewis92.github.io/angular-calendar/docs/ | angular-calendar}.
 *
 *
 */
@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  /**
   * Passes information to {@link ViewAvailabilityComponent}
   * when the day is clicked on the calendar
   */
  @ViewChild('dayContent', { static: true }) dayContent!: TemplateRef<any>;

  currentUser: string = '';
  userRoles: Array<string> = [];

  /* 
  TODO implement this later to view/edit individual events on the calendar
  TODO See handleEvent() below
  */
  // @ViewChild('eventClickedContent', { static: true })
  // eventClickedContent!: TemplateRef<any>;

  /** Empty array to be populated on dayClicked() */
  dayAvailability: Array<CalendarEventAvailability> = [];
  /** Empty array to be populated on dayClicked() */
  dayInterviews: Array<CalendarEventInterview> = [];

  /** This is where the local calendar events are stored */
  events: Array<CalendarEvent> = [];
  /** Array of all availability. */
  availability: Array<CalendarEventAvailability> = [];
  /** Array of all interviews. */
  interviews: Array<CalendarEventInterview> = [];

  /** @ignore */
  constructor(
    private _dialog: MatDialogService,
    private iRequester: InterviewRequesterService,
    private aRequester: AvailabilityRequesterService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.currentUser = getUsername();
    this.userRoles = getUserRoleNames();
    this.resetEvents();
    if (this.userRoles.includes('USER')) {
      console.log('is user');
      this.initUser();
    }
    if (this.userRoles.includes('RECRUITER')) {
      console.log('is recruiter');
      this.initRecruiter();
    }
    if (this.userRoles.includes('ADMIN')) {
      console.log('is admin');
      this.initAdmin();
    }
    this.delayedRefresh();
  }

  /** @ignore private? */
  sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //* in test
  /** Resets component properties */
  resetEvents(): void {
    this.events = [];
    this.availability = [];
    this.interviews = [];
  }

  //* in test
  /** @ignore needed for implementation? */
  async delayedRefresh(): Promise<void> {
    await this.sleep(2500)
      .then(() => this.refresh.next())
      .catch();
  }

  //* in test
  // todo streamline by removing availability and interviews and using filtering of events
  /** Populate the calendar with a users events and availability. */
  initUser(): void {
    this.aRequester.getUserAvailability(this.events, this.availability);
    this.iRequester.getUserInterviews(this.events, this.interviews);
  }

  initRecruiter(): void {
    this.aRequester.getRecruiterAvailability(this.events, this.availability);
    this.iRequester.getRecruiterInterviews(this.events, this.interviews);
  }

  initAdmin(): void {}


  // ! Calendar core functionality contained here, shouldn't need to touch it!
  // TODO openDayModal() may need corrected down the line.
  /** @ignore */
  view: CalendarView = CalendarView.Month;
  /** @ignore */
  CalendarView = CalendarView;
  /** @ignore */
  viewDate: Date = new Date();
  /** @ignore */
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  /** @ignore */
  refresh = new Subject<void>();
  /** @ignore */
  activeDayIsOpen: boolean = false;
  /** @ignore */
  openDayModal(dateSelected: Date /*useDate: boolean*/) {
    this.dayAvailability = [];
    this.dayInterviews = [];

    for (const element of this.availability) {
      if (isSameDay(element.start, dateSelected)) {
        this.dayAvailability.push(element);
      }
    }

    for (const element of this.interviews) {
      if (isSameDay(element.start, dateSelected)) {
        this.dayInterviews.push(element);
      }
    }

    // this.ms.openModalLg(this.dayContent);
    this._dialog.openDialogLarge(this.dayContent);
  }
  /** @ignore */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate) && events.length != 0) {
      this.openDayModal(date);
    }
  }
  /** @ignore */
  setView(view: CalendarView): void {
    this.view = view;
  }
  /** @ignore */
  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  //* obviously just a test function
  test() {
    let events: Array<CalendarEvent> = [];
    let myStartDate: Date = new Date('2022-05-01');
    let myEndDate: Date = new Date('2022-06-01');
    this.aRequester.getMyAvailabilityInRange(
      events,
      'thorfinn.manson@accolitedigital.com',
      '2022-05-01',
      '2022-06-01'
    );
  }
}
