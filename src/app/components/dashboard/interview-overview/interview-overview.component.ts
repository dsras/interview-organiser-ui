import { Component, OnInit } from '@angular/core';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import {
  outcomeOptions,
  statusOptions,
} from 'src/app/shared/constants/interview-options.constant';
import { InterviewReturn } from 'src/app/shared/models/types';

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
  interviews: InterviewReturn[] = [];

  allFilteredArrays: Map<string, InterviewReturn[]> = new Map();

  constructor(private iRequester: InterviewRequesterService) {}

  ngOnInit(): void {
    this.iRequester.getAllInterviews().subscribe((interviews) => {
      this.interviews = interviews;
      this.filterStatus();
      this.filterOutcome();
    });
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
        default:
          this.pending.push(interview);
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
      console.log(interview)
      switch (interview.outcome) {
        case outcomeOptions.completed:
          this.completed.push(interview);
          break;
        case outcomeOptions.didNotProgress:
          this.didNotProgress.push(interview);
          break;
        case outcomeOptions.pending:
          this.pending.push(interview);
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
      .set('Progressed', this.progressed);
  }
}
