import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ViewAvailabilityModalComponent } from './view-availability-modal/view-availability.component';
import { MockInjectorService } from 'src/app/services/mock-injector.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Requester } from '../requester/requester.service';
import {
  data,
  userData,
  skills,
  availability,
  interview
 }from '../requester/requestBodyTypes/types'
 import { RequestCenterService } from '../requester/request-center.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { FormGroup } from '@angular/forms';
import { COLOURS } from '../../constants/colours.constant';
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
  //Hadi's cmnt
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calendar.component.html',
})

export class CalendarComponent implements OnInit{

  modalRef: MDBModalRef | null = null;

  //TODO Test data initialiser, needs removed after testing complete
  mockAvailability!: any;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  //* This is where the local calendar events are stored
  skills: skills[]=[];


  events: CalendarEvent[] = [
    //* Commented out below are some prepopulated events from the original calendar
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
  ];

  constructor(
    private router: Router,
    private dataInjector: MockInjectorService,
    //TODO These may need to be changed later, currently used by base calendar
    private modal: NgbModal,
    private modalService: MDBModalService,
    private rs: RequestCenterService
  ) {

  }

  ngOnInit(): void {
    this.getMockAvailability();
    this.populateCalendar();
  }

  redirect(page: string) : void {
    this.router.navigate([page]);
  }

  //* Test method to unpack availability from JSON
  getMockAvailability() : void {
    this.mockAvailability = JSON.parse(this.dataInjector.getMockData()).totalAvailability
  }

  //* Test method to populate calendar with mocked data, replaced by calls to DB
  addMockData(): void {
    for (let i = 0; i < this.mockAvailability.length; i++) {
      let data = this.mockAvailability[i];
      let start = new Date(`${data.date}T${data.start_time}`)
      let end = new Date(`${data.date}T${data.end_time}`)
      this.events.push(
        {
          start: startOfDay(new Date(start)),
          end: endOfDay(new Date(end)),
          title: `User1 availability ${i}`,
          color: COLOURS.RED_DARK,
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }
      )
    }
  }

  //* Test method to log to console the outputted data from JSON
  showMockData() : void {
    console.log("Users Availability")
    for (let i = 0; i < this.mockAvailability.length; i++) {
      let data = this.mockAvailability[i];
      console.log(
        `
        Date: ${data.date}
        Start time: ${data.start_time}
        End time: ${data.end_time}
        Formatted start: ${new Date(`${data.date}T${ data.start_time}`)}`
        )
    }
  }

  //* Basic button method to log current date, remove later
  currentDate() : void {
    console.log(`Current Date Button: ${new Date().toISOString()}`)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async delayedRefresh() {
    //Say Hello
    console.log('Hello');
    // Say World after 2000 milliseconds
    await this.sleep(2250).then(() =>this.refresh.next()).catch();
    console.log("World2");
  }
  getInterviewsByRec(){
    this.rs.getInterviewByRecruiter(this.events);
  }
  getInterviewsByInter(){
    this.rs.getInterviewByInterviewer(this.events);
  }

  getSkillsforUser(){
    this.rs.getSkills();
  }
  getApplicants(){
    //this.rs.getAllApplicants();
  }
  getUser(){
    this.rs.getUser();
  }
  populateViaRecruiter(){
    this.events=[];
    this.rs.getAllAvailability(this.events);
    console.log("length of events list ext: " + this.events.length);   
    this.delayedRefresh();
  }
  populateCalendar()  {
    this.events = [];
    this.rs.getMyAvailability(this.events);
    console.log("length of events list ext: " + this.events.length);
    this.rs.getInterviewByInterviewer(this.events);
    this.delayedRefresh();
  }
  buttonRefresh(){
    this.refresh.next();
  }
  // * Test method
  checkConnection(){
    // var skillsIDs = [1,2,3];
    // this.rs.getAvailabilityOnSkill(skillsIDs);
    //this.rs.addApplicant();

    this.rs.addInterview([23], "2022-04-22","09:00", "10:00", "some additional info");
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

  }

  onSubmitAvailability(form: FormGroup) : void {
    console.log("Availability added: ")
    console.log(form.value);
    this.populateCalendar();
  }

  onSubmitSkills(form: FormGroup) : void {
    console.log("Skills added: ")
    console.log(form.value)
    this.populateCalendar();
  }

  /**
   * ! Calendar core functionality contained here, shouldn't need to touch it!
   * TODO openDayModal() may need corrected down the line.
   */
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

  activeDayIsOpen: boolean = true;

  openDayModal(dateSelected: Date, useDate: boolean) {

    var eventsOnDay= [];
    var interviewsOnDay= [];
    if(useDate){
      for (var index = 0; index < this.events.length; index++) {
        if(isSameDay(this.events[index].start, dateSelected)){
          if(this.events[index].title === 'availability'){
            eventsOnDay.push(this.events[index]);
          }
          else if(this.events[index].title === 'interview'){
            interviewsOnDay.push(this.events[index]);
          }
        }
      }
     
      eventsOnDay.forEach(function(eventSel){
        console.log("From start: " + eventSel.start + ", to end: " + eventSel.end);
      })
    }

    var mfc = ViewAvailabilityModalComponent;
    this.modalRef = this.modalService.show(mfc, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: 'bottom',
      animated: true
    });
    this.modalRef.content.action.subscribe((result: any) => { console.log(result); });

    if(eventsOnDay.length == 0){
      //new event
    }
    else{
      mfc.addEventRef(eventsOnDay,interviewsOnDay);
    }


  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.openDayModal(date, true);

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
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // This is the default method that auto-generates an event for 'todays date'
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: COLOURS.RED_DARK,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
