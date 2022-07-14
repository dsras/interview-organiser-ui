import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
export class MyInterviewsComponent implements OnInit, OnDestroy {
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

  destroy$: Subject<boolean> = new Subject();

  constructor(private iRequester: InterviewRequesterService) {}

  /** Populate interviews on init */
  ngOnInit(): void {
    this.getInterviews();
    this.expandedInterview = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** Request table data from the database */
  getInterviews(): void {
    this.iRequester
      .getUserInterviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe((interviews) => {
        this.tableData.setData(interviews);
        console.log(interviews);
      });
  }
}
