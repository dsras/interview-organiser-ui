import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { SkillCoverageTableData } from 'src/app/shared/models/table-data';

@Component({
  selector: 'skill-coverage',
  templateUrl: './skill-coverage.component.html',
  styleUrls: ['./skill-coverage.component.scss']
})
export class SkillCoverageComponent implements OnInit {
  /** Array to be populated with interviews */
  skills = [];
  displayedColumns: Array<string> = [
    'interview_id',
    'interviewers',
    'date',
    'start_time',
    'status',
  ];
  dataToDisplay = [...this.skills];
  dataSource = new SkillCoverageTableData(this.dataToDisplay);

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
