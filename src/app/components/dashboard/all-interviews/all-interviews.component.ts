import { Component, OnInit, TemplateRef } from '@angular/core';
import { interview } from 'src/app/shared/models/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';

/**
 * Display all interviews
 */
@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss']
})
export class AllInterviewsComponent implements OnInit {
  /** Array to be populated with interviews */
  interviews: Array<interview> = [];

  /** @ignore */
  constructor(
    private ms: ModalControllerService,
    private iRequester: InterviewRequesterService
  ) { }

  /** Populate interviews on init */
  ngOnInit(): void {
    this.iRequester.getInterviewsDashboard(this.interviews);
  }
  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template)
  }
  /** @ignore */
  closeModal(): void {
    this.ms.closeModal()
  }

}
