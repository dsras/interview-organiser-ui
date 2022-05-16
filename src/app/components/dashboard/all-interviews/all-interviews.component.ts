import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';

/**
 * Display all interviews
 */
@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss'],
})
export class AllInterviewsComponent implements OnInit {
  /** Array to be populated with interviews */
  interviews: Array<CalendarEventInterview> = [];
  columnsToDisplay: Array<string> = ['id', 'panel', 'time', 'date', 'status'];

  /** @ignore */
  constructor(
    private ms: ModalControllerService,
    private iRequester: InterviewRequesterService
  ) {}

  /** Populate interviews on init */
  ngOnInit(): void {
    this.iRequester.getInterviewsDashboard(this.interviews);
  }
  /** @ignore test method that should be replaced when completed */
  print(obj: any): void {
    console.log(JSON.stringify(obj));
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
