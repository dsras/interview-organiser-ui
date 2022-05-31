import { Component, OnInit } from '@angular/core';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { InterviewReturn } from 'src/app/shared/models/types';

@Component({
  selector: 'app-interview-overview',
  templateUrl: './interview-overview.component.html',
  styleUrls: ['./interview-overview.component.scss'],
})
export class InterviewOverviewComponent implements OnInit {
  completed: InterviewReturn[] = [];
  panelNoShow: InterviewReturn[] = [];
  candidateNoShow: InterviewReturn[] = [];
  confirmed: InterviewReturn[] = [];
  didNotProgress: InterviewReturn[] = [];
  interviews:InterviewReturn[] = [];

  constructor(
    private iRequester: InterviewRequesterService
  ) {}

  ngOnInit(): void {
    this.iRequester.getAllInterviews().subscribe((interviews) => {
      this.interviews = interviews
    })
  }

  filterStatus(): void {

  }

  filterOutcome(): void {
    
  }
}
