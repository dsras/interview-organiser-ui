import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import {
  outcomeOptions,
  statusOptions,
} from 'src/app/shared/constants/interview-options.constant';
import { InterviewTableData } from 'src/app/shared/models/table-data';
import { InterviewReturn } from 'src/app/shared/models/types';

@Component({
  selector: 'completed-interviews',
  templateUrl: './completed-interviews.component.html',
  styleUrls: ['./completed-interviews.component.scss'],
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
export class CompletedInterviewsComponent implements OnInit, OnDestroy {
  /** Array to be populated with interviews */
  completedInterviews: Array<InterviewReturn> = [];
  /** Collection of data to be displayed in table */
  tableData: InterviewTableData = new InterviewTableData(
    this.completedInterviews
  );
  /** Selector for expanded view on table */
  expandedInterview!: InterviewReturn | null;
  /** The columns to be displayed in the table */
  displayedColumns: Array<string> = [
    'interviewId',
    'interviewers',
    'date',
    'time',
  ];
  destroy$: Subject<boolean> = new Subject();

  /** @ignore */
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
    let filtered: InterviewReturn[] = [];
    this.iRequester
      .getAllInterviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe((interviews) => {
        console.table(interviews);
        interviews.forEach((interview) => {
          if (interview.outcome == outcomeOptions.completed) {
            filtered.push(interview);
          }
        });
        this.tableData.setData(filtered);
      });
  }

  /** @ignore test method that should be replaced when completed */
  print(obj: any): void {
    console.log(JSON.stringify(obj));
  }

  /** @ignore test method to be removed when completed */
  message(text: string): void {
    console.log(text);
  }
}
