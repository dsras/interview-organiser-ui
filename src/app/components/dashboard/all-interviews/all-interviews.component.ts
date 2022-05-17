import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { TableDataSource } from 'src/app/shared/models/table-data';
import { InterviewReturn } from 'src/app/shared/models/types';

/**
 * Display all interviews in a table
 */
@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss'],
})
export class AllInterviewsComponent implements OnInit {
  /** Array to be populated with interviews */
  interviews: Array<InterviewReturn> = [];
  displayedColumns: Array<string> = [
    'interview_id',
    'interviewers',
    'date',
    'start_time',
    'status',
  ];
  dataToDisplay = [...this.interviews];
  dataSource = new TableDataSource(this.dataToDisplay);

  /** @ignore */
  constructor(
    private ms: ModalControllerService,
    private iRequester: InterviewRequesterService
  ) {}

  /** Populate interviews on init */
  ngOnInit(): void {
    this.getInterviews();
  }

  getInterviews() {
    this.iRequester.getAllInterviews().subscribe((interviews) => {
      console.log(interviews)
      this.dataSource.setData(interviews);
    });
  }
  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }
  /** @ignore */
  closeModal(): void {
    this.ms.closeModal();
  }
}
