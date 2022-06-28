import { Component, OnInit } from '@angular/core';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { CalendarColors } from 'src/app/shared/constants/colours.constant';
import {
  outcomeOptions,
  statusOptions,
} from 'src/app/shared/constants/interview-options.constant';
import { InterviewReturn } from 'src/app/shared/models/types';
import { from } from 'rxjs';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { DateToStringService } from 'src/app/services/date-to-string.service';
import { MatTableDataSource } from '@angular/material/table';

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

  startDate = new Date();
  endDate = new Date();

  displayedColumns: string[] = [
    'ID',
    'Date',
    'Time'
  ]
  aTable!: MatTableDataSource<CalendarEventInterview>;

  constructor(
    private iRequester: InterviewRequesterService,
    private userService: GetUserDataService,
    private requester: RequestCenterService,
    private dateString: DateToStringService,
    ) {}


  setDates() {
    this.startDate.setMonth(new Date().getMonth());
    this.startDate.setDate(1);
    this.endDate.setMonth(new Date().getMonth() + 1);
    this.endDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
  }
  ngOnInit(): void {
    console.log('interview overview init');
    this.currentUser = this.userService.getUsername();
    this.requester.getUserRoles(this.currentUser).subscribe((returnData) => {
      returnData.forEach((element) => {
        this.userRoles.push(element);
      });
      this.setDates();
      if (this.userRoles.includes('RECRUITER')) {
        console.log('rec true')
        this.isRecruiter = true;
        this.iRequester.getAllInterviews().subscribe((interviews) => {
          this.interviews = interviews;
          this.filterStatus();
          this.filterOutcome();
        });
      }
      else{
        console.log('user true');

        this.isUser = true;
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
    })
    
   
  }


  private filterStatus(): void {

    this.interviews.forEach((interview) => {
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
        default:
          break;
      }
    });
    this.allFilteredArrays
      .set('Candidate No Show', this.candidateNoShow)
      .set('Completed', this.completed)
      .set('Panel No Show', this.panelNoShow)
      .set('Pending', this.pending);
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
