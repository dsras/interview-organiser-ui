import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import {
  interviewOutcomeOptions,
  interviewStatusOptions,
} from 'src/app/shared/constants/interview-options.constant';

/**
 * Component to view and modify interview status
 *
 * TODO Filter form options depending on the roles of logged in user
 */
@Component({
  selector: 'interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.scss'],
})
export class InterviewStatusComponent implements OnInit {
  @Input() slot?: CalendarEventInterview;

  /** Form for updating interview status */
  statusForm: FormGroup = this.fb.group({
    status: [''],
  });
  /** Available status options */
  statusList: Array<string> = interviewStatusOptions;
  /** Available outcome options */
  outcomeList: Array<string> = interviewOutcomeOptions;
  /** Options for a recruiter to select */
  interviewerOptions: Array<string> = [this.statusList[0], this.statusList[1]];
  /** Options for an interviewer to select */
  recruiterOptions: Array<string> = [
    this.statusList[2],
    this.outcomeList[0],
    this.outcomeList[1],
    this.outcomeList[2],
  ];

  // interviewStatusForm?: FormGroup;

  constructor(
    private ms: ModalControllerService,
    private fb: FormBuilder,
    private iRequester: InterviewRequesterService
  ) {}

  ngOnInit() {}

  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModalLg(template);
  }

  /** @ignore */
  closeModal(): void {
    this.ms.closeModal();
  }

  /** 
   * Function to be called on click of the submit button
   */
  onSubmit(f: FormGroup): void {
    console.log(f.value);
    console.log(this.slot);
    const str: string = f.value.status;
    let id: number = -1;

    if (this.slot?.id) {
      id = Number(this.slot.id);
    }
    console.log('made it to the error check');
    console.log(str);
    console.log(this.statusList);
    console.log(this.outcomeList);
    // TODO streamline this?
    let errCount: number = 0;
    let isOutcome: boolean = true;
    if (!this.statusList.includes(str) && !this.outcomeList.includes(str)) {
      console.warn('no valid status given');
      return;
    }

    console.log('made it to the requester');
    this.iRequester.updateInterviewStatus(id, str, !isOutcome);
    f.reset();
  }
}
