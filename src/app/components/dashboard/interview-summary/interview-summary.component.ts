import { Component, OnInit } from '@angular/core';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

@Component({
  selector: 'interview-summary',
  templateUrl: './interview-summary.component.html',
  styleUrls: ['./interview-summary.component.scss']
})
export class InterviewSummaryComponent implements OnInit {
  

  constructor(
    private iRequester: InterviewRequesterService,
    private aRequester: AvailabilityRequesterService,
  ) { }

  ngOnInit(): void {
  }

}
