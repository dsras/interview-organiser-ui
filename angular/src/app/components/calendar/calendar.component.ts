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
import { skills } from '../../models/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import {
  CalendarEventAvailability,
  CalendarEventInterview,
} from 'src/app/models/calendar-event-detail';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };
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
  events: Array</*CalendarEvent |*/ CalendarEventAvailability | CalendarEventInterview> = [];
  availability: CalendarEventAvailability[] = [];
  interviews: CalendarEventInterview[] = [];

  constructor(
    private router: Router,
    private modal: NgbModal,
    private ms: ModalControllerService,
    private rs: RequestCenterService
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

  resetEvents(): void {
    this.events = [];
    this.availability = [];
    this.interviews = [];
  }

  async delayedRefresh(): Promise<void> {
    await this.sleep(2500)
      .then(() => this.refresh.next())
      .catch();
  }

  getInterviewsByRec() {
    // ? Is this code ever used or is it duplicating work ing this.rs.getUsername() ??
    let username: string = '';
    let inString = <string>localStorage.getItem('ssoUser');
    let myObj = JSON.parse(inString);
    username = myObj.email;
    // ???????????????????????????????????????????????????????????????????????????????
    this.rs.getInterviewByRecruiter(this.events, this.rs.getUsername());
  }

  getInterviewsByInter(): void {
    this.rs.getInterviewByInterviewer(this.events, this.rs.getUsername());
    this.rs.getInterviewByInterviewer(this.interviews, this.rs.getUsername());
  }
  getSkillsforUser(): void {
    this.rs.getSkills(this.rs.getUsername());
  }

  getApplicants(): void {
    // this.rs.getAllApplicants();
  }

  getUser(): void {
    this.rs.getUser(this.rs.getUsername());
  }

  populateViaRecruiter(): void {
    this.resetEvents();
    this.rs.getAllAvailability(this.events);
    this.rs.getAllAvailability(this.availability);
    this.delayedRefresh();
  }

  populateCalendar(): void {
    this.resetEvents();
    this.rs.getMyAvailability(this.events, this.rs.getUsername());
    this.rs.getMyAvailability(this.availability, this.rs.getUsername());
    this.rs.getInterviewByInterviewer(this.events, this.rs.getUsername());
    this.rs.getInterviewByInterviewer(this.interviews, this.rs.getUsername());
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
      this.openDayModal(date);
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

  // * This is the default method that auto-generates an event for 'todays date'
  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

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
