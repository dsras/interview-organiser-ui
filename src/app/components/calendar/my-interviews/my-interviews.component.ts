import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { InterviewTableData } from 'src/app/shared/models/table-data';
import { InterviewReturn } from 'src/app/shared/models/types';

@Component({
  selector: 'my-interviews',
  templateUrl: './my-interviews.component.html',
  styleUrls: ['./my-interviews.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MyInterviewsComponent implements OnInit {
  /** Array to be populated with interviews */
  interviews: Array<InterviewReturn> = [];
  /** Collection of data to be displayed in table */
  tableData: InterviewTableData = new InterviewTableData(this.interviews);
  /** Selector for expanded view on table */
  expandedInterview!: InterviewReturn | null;
  /** The columns to be displayed in the table */
  displayedColumns: Array<string> = [
    'interviewId',
    'interviewers',
    'date',
    'time',
    // 'outcome',
    // 'status',
  ];

  constructor(private iRequester: InterviewRequesterService) {}

  /** Populate interviews on init */
  ngOnInit(): void {
    this.getInterviews();
    this.expandedInterview = null;
  }

  /** Request table data from the database */
  getInterviews(): void {
    this.iRequester.getUserInterviews().subscribe((interviews) => {
      this.tableData.setData(interviews);
      console.log(interviews);
    });
  }
}
