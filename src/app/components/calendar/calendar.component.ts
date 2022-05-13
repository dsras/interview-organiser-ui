import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

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
  events: Array<CalendarEventAvailability | CalendarEventInterview> = [];
  /**
   * Array of all availability.
   * 
   * TODO implement using just events and filtering
   */
  availability: Array<CalendarEventAvailability> = [];
   /**
   * Array of all interviews.
   * 
   * TODO implement using just events and filtering
   */
  interviews: Array<CalendarEventInterview> = [];

  /** @ignore */
  constructor(
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private iRequester: InterviewRequesterService,
    private aRequester: AvailabilityRequesterService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.populateCalendar();
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


  /**
   * Populates events and interviews arrays with interviews
   */
  //! Probably depreciated
  // getInterviewsByInter(): void {
  //   this.iRequester.getInterviewByInterviewer(
  //     this.events,
  //     this.rs.getUsername()
  //   );
  //   this.iRequester.getInterviewByInterviewer(
  //     this.interviews,
  //     this.rs.getUsername()
  //   );
  // }

  /** @ignore does nothing for now */
  // getSkillsforUser(): void {
  //   this.rs.getSkills(this.rs.getUsername());
  // }

  /** @ignore HUH? */
  // getUser(): void {
  //   this.rs.getUser(this.rs.getUsername());
  // }

  /** Called only on button press for now */
  // populateViaRecruiter(): void {
  //   this.resetEvents();
  //   this.aRequester.getAllAvailability(this.events);
  //   this.aRequester.getAllAvailability(this.availability);
  //   this.delayedRefresh();
  // }

  //* in test
  /**
   *  Populate the calendar with an interviewers events and availability.
   * 
   * todo stremline by removing availability and interviews and using filtering of events
   */
  populateCalendar(): void {
    this.resetEvents();
    this.aRequester.getMyAvailability(this.events, this.rs.getUsername());
    this.aRequester.getMyAvailability(this.availability, this.rs.getUsername());
    this.iRequester.getInterviewByInterviewer(
      this.events,
      this.rs.getUsername()
    );
    this.iRequester.getInterviewByInterviewer(
      this.interviews,
      this.rs.getUsername()
    );
    this.delayedRefresh();
  }
  /** @ignore */
  // buttonRefresh(): void {
  //   this.refresh.next();
  // }

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

    this.ms.openModalLg(this.dayContent);
  }
  /** @ignore */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (events.length != 0) {
        this.openDayModal(date);
      }
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
}
