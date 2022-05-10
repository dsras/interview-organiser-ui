import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { skills } from '../../shared/models/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/shared/models/calendar-event-detail';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';


@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  //TODO Test data initialiser, needs removed after testing complete
  mockAvailability!: any;

  @ViewChild('dayContent', { static: true }) dayContent!: TemplateRef<any>;
  @ViewChild('eventClickedContent', { static: true })
  eventClickedContent!: TemplateRef<any>;

  // * Events taking place on day clicked
  // TODO do we need these
  dayAvailability:Array<CalendarEventAvailability> = [];
  dayInterviews: Array<CalendarEventInterview> = [];

  //* This is where the local calendar events are stored
  skills: skills[] = [];
  events: Array<CalendarEventAvailability | CalendarEventInterview> = [];
  availability: Array<CalendarEventAvailability> = [];
  interviews: Array<CalendarEventInterview> = [];

  constructor(
    private router: Router,
    private modal: NgbModal,
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private iRequester: InterviewRequesterService,
    private aRequester: AvailabilityRequesterService,
  ) {}

  ngOnInit(): void {
    this.populateCalendar();
  }

  redirect(page: string): void {
    this.router.navigate([page]);
  }

  sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //* in test
  resetEvents(): void {
    this.events = [];
    this.availability = [];
    this.interviews = [];
  }
  
  //* in test
  async delayedRefresh(): Promise<void> {
    await this.sleep(2500)
      .then(() => this.refresh.next())
      .catch();
  }

  getInterviewsByRec() {
    this.iRequester.getInterviewByRecruiter(this.events, this.rs.getUsername());
  }

  getInterviewsByInter(): void {
    this.iRequester.getInterviewByInterviewer(this.events, this.rs.getUsername());
    this.iRequester.getInterviewByInterviewer(this.interviews, this.rs.getUsername());
  }
  getSkillsforUser(): void {
    this.rs.getSkills(this.rs.getUsername());
  }

  getApplicants(): void {}

  getUser(): void {
    this.rs.getUser(this.rs.getUsername());
  }

  populateViaRecruiter(): void {
    this.resetEvents();
    this.aRequester.getAllAvailability(this.events);
    this.aRequester.getAllAvailability(this.availability);
    this.delayedRefresh();
  }

  //* in test
  populateCalendar(): void {
    this.resetEvents();
    this.aRequester.getMyAvailability(this.events, this.rs.getUsername());
    this.aRequester.getMyAvailability(this.availability, this.rs.getUsername());
    this.iRequester.getInterviewByInterviewer(this.events, this.rs.getUsername());
    this.iRequester.getInterviewByInterviewer(this.interviews, this.rs.getUsername());
    this.delayedRefresh();
  }

  buttonRefresh(): void {
    this.refresh.next();
  }

  // * Test method
  // checkConnection(){
  // var skillsIDs = [1,2,3];
  // this.rs.getAvailabilityOnSkill(skillsIDs);
  //this.rs.addApplicant();

  // this.rs.addInterview([23], "2022-04-22","09:00", "10:00", "some additional info");
  // var url = "http://localhost:8080/users/welcome";
  // this.requester.getRequest<string>(url).subscribe(returnData =>{
  //   console.log(returnData);

  // })

  // var url = "http://localhost:8080/users/user?username=test_user1";
  // this.requester.getRequest<userData>(url).subscribe(returnData =>{
  //   console.log(returnData);

  // })

  // url = "http://localhost:8080/skills/skill?name=Java";
  // this.requester.getRequest<skills>(url).subscribe(returnData =>{
  //   console.log(returnData);

  // })

  // var newSkill = new skills(1,"running", "expert");
  // url = "http://localhost:8080/skills/new";
  // this.requester.postRequest<skills>(url, newSkill).subscribe(returnData=>{
  //   console.log(returnData);
  // })

  // }

  // ! Calendar core functionality contained here, shouldn't need to touch it!
  // TODO openDayModal() may need corrected down the line.

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = false;

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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      // if (
      //   (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      //   events.length === 0
      // ) {
      //   this.activeDayIsOpen = false;
      // } else {
      //   this.activeDayIsOpen = true;
      // }
      // this.viewDate = date;
      if (events.length != 0) {
        this.openDayModal(date);
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.eventClickedContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
