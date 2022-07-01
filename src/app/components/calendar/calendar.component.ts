import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { DateToStringService } from '../../services/date-to-string.service';
import { GetUserDataService } from '../../services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { CalendarUpdaterService } from 'src/app/services/calendar-updater.service';
import { FocusDayService } from 'src/app/services/focus-day.service';
import { OverviewUpdaterService } from 'src/app/services/overview-updater.service';

/**
 * The main component of the calendar, an implementation of angular-calendar
 *
 * {@link https://mattlewis92.github.io/angular-calendar/docs/ | angular-calendar}.
 *
 */
@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  /**
   * Passes information to {@link ViewAvailabilityComponent}
   * when the day is clicked on the calendar
   */
  @ViewChild('dayContent', { static: true }) dayContent!: TemplateRef<any>;

  currentUser: string = '';
  userRoles: Array<string> = [];

  updateSubscription!: Subscription;

  /* 
  TODO implement this later to view/edit individual events on the calendar
  TODO See handleEvent() below
  */
  // @ViewChild('eventClickedContent', { static: true })
  // eventClickedContent!: TemplateRef<any>;
  isRecruiter: boolean = false;
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
  startDate = new Date();
  endDate = new Date();

  /** @ignore */
  constructor(
    private _dialog: MatDialogService,
    private requester: RequestCenterService,
    private iRequester: InterviewRequesterService,
    private aRequester: AvailabilityRequesterService,
    private dateString: DateToStringService,
    private userService: GetUserDataService,
    private updater: CalendarUpdaterService,
    private oUpdater: OverviewUpdaterService
  ) {
    this.populateCalendar = this.populateCalendar.bind(this);
  }

  /** @ignore */
  ngOnInit(): void {
    this.currentUser = this.userService.getUsername();
    //this.userRoles = this.userService.getUserRoleNames();
    this.requester.getUserRoles(this.currentUser).subscribe((returnData) => {
      returnData.forEach((element) => {
        this.userRoles.push(element);
      });
      this.populateCalendar();
    });
    //setup dates
    this.setDates();

    this.updateSubscription = this.updater
      .getEmitter()
      .subscribe(() => this.callbackFunction());

  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
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

  fastRefresh(): void {
    this.refresh.next();
  }

  callbackFunction(): void {
    this.populateCalendar();
  }
  //* in test
  // todo streamline by removing availability and interviews and using filtering of events
  /** Populate the calendar with a users events and availability. */
  populateCalendar(): void {
    this.resetEvents();

    // TODO make switch cases
    if (this.userRoles.includes('RECRUITER')) {
      this.isRecruiter = true;
      this.initRecruiter();
    }
    if (
      this.userRoles.includes('USER') &&
      !this.userRoles.includes('RECRUITER')
    ) {
      this.initUser();
    }
    if (this.userRoles.includes('ADMIN')) {
      this.initAdmin();
    }
  }

  initUser(): void {
    this.aRequester
      .getMyAvailabilityInRange(
        this.userService.getUsername(),
        this.dateString.dateToStringDate(this.startDate),
        this.dateString.dateToStringDate(this.endDate)
      )
      .subscribe((ret) => {
        ret.forEach((ele) => {
          this.events.push(this.aRequester.parseAvailabilityUser(ele));
          this.availability.push(this.aRequester.parseAvailabilityUser(ele));
        });
        this.fastRefresh();
      });

    this.iRequester
      .getInterviewsPerMonthByInterviewer(
        false,
        this.dateString.dateToStringDate(this.startDate),
        this.dateString.dateToStringDate(this.endDate)
      )
      .subscribe((ret) => {
        ret.forEach((ele) => {
          this.events.push(this.iRequester.parseInterviewUser(ele));
          this.interviews.push(this.iRequester.parseInterviewUser(ele));
        });
        this.fastRefresh();
      });
  }

  initRecruiter(): void {
    this.aRequester.getRecruiterAvailability(
      this.dateString.dateToStringDate(this.startDate),
      this.dateString.dateToStringDate(this.endDate)
    ).subscribe((ret) => {
      ret.forEach((ele) => {
        this.events.push(this.aRequester.parseAvailabilityRecruiter(ele));
        this.availability.push(this.aRequester.parseAvailabilityRecruiter(ele));
      });
      this.fastRefresh();
    });
    this.iRequester
      .getInterviewsPerMonthByInterviewer(
        false,
        this.dateString.dateToStringDate(this.startDate),
        this.dateString.dateToStringDate(this.endDate)
      )
      .subscribe((ret) => {
        ret.forEach((ele) => {
          this.events.push(this.iRequester.parseInterviewRecruiter(ele));
          this.interviews.push(this.iRequester.parseInterviewRecruiter(ele));
        });
        this.fastRefresh();
      });
  }

  initAdmin(): void {}

  tabChange(): void {
    this._dialog.resizeDay();
  }

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
    this._dialog.openDay(this.dayContent);
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

  setDates() {
    this.startDate.setMonth(this.viewDate.getMonth());
    this.startDate.setDate(1);
    this.endDate.setMonth(this.viewDate.getMonth()+1);
    this.endDate.setDate(0);
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
  }

  /** @ignore */
  closeOpenMonthViewDay(): void {
    console.log("focus day");
    console.log(this.viewDate);
    FocusDayService.changeDate(this.viewDate);
    this.oUpdater.updateOverview();
    this.setDates();
    this.populateCalendar();
    this.activeDayIsOpen = false;
  }
  test() {}
}
