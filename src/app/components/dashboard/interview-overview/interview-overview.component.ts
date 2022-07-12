import { Component, OnInit } from '@angular/core';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import {
  outcomeOptions,
  statusOptions,
} from 'src/app/shared/constants/interview-options.constant';
import { InterviewReturn } from 'src/app/shared/models/types';
import { elementAt, Subscription } from 'rxjs';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { DateToStringService } from 'src/app/services/date-to-string.service';
import { MatTableDataSource } from '@angular/material/table';
import { FocusDayService } from 'src/app/services/focus-day.service';
import { OverviewUpdaterService } from 'src/app/services/overview-updater.service';

@Component({
  selector: 'interview-overview',
  templateUrl: './interview-overview.component.html',
  styleUrls: ['./interview-overview.component.scss'],
})
export class InterviewOverviewComponent implements OnInit {
  completed: InterviewReturn[] = [];
  panelNoShow: InterviewReturn[] = [];
  candidateNoShow: InterviewReturn[] = [];
  pending: InterviewReturn[] = [];

  stage1Interviews: InterviewReturn[]=[];
  stage2Interviews: InterviewReturn[]=[];
  stage3Interviews: InterviewReturn[]=[];


  confirmed: InterviewReturn[] = [];
  didNotProgress: InterviewReturn[] = [];
  progressed: InterviewReturn[] = [];
  awaitingCompletion: InterviewReturn[] = [];
  interviews: InterviewReturn[] = [];
  interviewEvents: CalendarEventInterview[] = [];
  allFilteredArrays: Map<string, InterviewReturn[]> = new Map();

  currentUser = '';
  userRoles: string[] = [];
  isRecruiter = false;
  isUser = false;

  focusDay = new Date();
  startDate = new Date();
  endDate = new Date();

  updateSubscription!: Subscription;

  displayedColumns: string[] = ['ID', 'Date', 'Time', 'Status'];
  aTable!: MatTableDataSource<CalendarEventInterview>;

  constructor(
    private iRequester: InterviewRequesterService,
    private userService: GetUserDataService,
    private requester: RequestCenterService,
    private dateString: DateToStringService,
    private updater: OverviewUpdaterService
  ) {}

  setDates() {
    this.focusDay = FocusDayService.getFocusDate();
    console.log('This is a check');
    console.log(this.focusDay);
    this.startDate.setMonth(this.focusDay.getMonth());
    this.startDate.setDate(1);
    this.endDate.setMonth(this.focusDay.getMonth() + 1);
    this.endDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
  }
  ngOnInit(): void {
    this.currentUser = this.userService.getUsername();

    this.updateSubscription = this.updater
      .getEmitter()
      .subscribe(() => this.callbackFunction());

    this.requester.getUserRoles(this.currentUser).subscribe((returnData) => {
      returnData.forEach((element) => {
        this.userRoles.push(element);
      });
      this.getData();
    });
  }
  callbackFunction(): void {
    this.getData();
  }
  getData() {
    this.interviews = [];
    this.interviewEvents = [];
    console.log('overview get data called');
    this.setDates();
    if (this.userRoles.includes('RECRUITER')) {
      this.isRecruiter = true;
      this.iRequester.getAllInterviews().subscribe((interviews) => {
        this.interviews = interviews;
        this.filterStatus();
        this.filterOutcome();
      });
    } else {
      this.isUser = true;
      console.log('dates for the interview list');
      console.log(this.startDate);
      console.log(this.endDate);
      this.iRequester
        .getInterviewsPerMonthByInterviewer(
          false,
          this.dateString.dateToStringDate(this.startDate),
          this.dateString.dateToStringDate(this.endDate)
        )
        .subscribe((ret) => {
          ret.forEach((ele) => {
            this.interviewEvents.push(this.iRequester.parseInterviewUser(ele));
          });
          this.aTable = new MatTableDataSource(this.interviewEvents);
          console.log(this.interviewEvents);
        });
    }
  }

  private filterStatus(): void {
    this.interviews.forEach((interview) => {
      console.log(interview);
      switch (interview.status) {
        case statusOptions.candidateNoShow:
          this.candidateNoShow.push(interview);
          break;
        case statusOptions.completed:
          this.completed.push(interview);
          break;
        case statusOptions.panelNoShow:
          this.panelNoShow.push(interview);
          break;
        case statusOptions.pending:
          this.pending.push(interview);
          break;
        case statusOptions.S1:
          this.stage1Interviews.push(interview);
          break;
        case statusOptions.S2:
          this.stage2Interviews.push(interview);
          break;
        case statusOptions.S3:
          this.stage3Interviews.push(interview);
          break;
                    
        default:
          break;
      }
    });
    this.allFilteredArrays
      .set('Candidate No Show', this.candidateNoShow)
      .set('Completed', this.completed)
      .set('Panel No Show', this.panelNoShow)
      .set('Pending', this.pending)
      .set(statusOptions.S1, this.stage1Interviews)
      .set(statusOptions.S2, this.stage2Interviews)
      .set(statusOptions.S3, this.stage3Interviews);
  }

  private filterOutcome(): void {
    this.interviews.forEach((interview) => {
      switch (interview.outcome) {
        case outcomeOptions.completed:
          this.completed.push(interview);
          break;
        case outcomeOptions.didNotProgress:
          this.didNotProgress.push(interview);
          break;
        case outcomeOptions.awaitingCompletion:
          this.awaitingCompletion.push(interview);
          break;
        case outcomeOptions.progressed:
          this.progressed.push(interview);
          break;
        default:
          break;
      }
    });
  this.allFilteredArrays
    .set('Completed', this.completed)
    .set('Did Not Progress', this.didNotProgress)
    .set('Progressed', this.progressed)
    .set('Awaiting Completion', this.awaitingCompletion);
  }
}
