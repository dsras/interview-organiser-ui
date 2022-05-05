import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { CalendarEventInterview } from 'src/app/common/models/calendar-event-detail';

@Component({
  selector: 'interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.scss'],
})
export class InterviewStatusComponent implements OnInit {
  @Input() slot?: CalendarEventInterview;

  statusForm: FormGroup = this.fb.group({
    status: [''],
  });

  myForm?: FormGroup;

  interviewStatusOptions: Array<string> = [];

  statusList: Array<string> = [
    'Completed',
    'Candidate No Show',
    'Panel No Show',
  ];

  outcomeList: Array<string> = ['Progressed', 'Didnt Progress', 'Hired'];

  interviewerOptions: Array<string> = [this.statusList[0], this.statusList[1]];

  recruiterOptions: Array<string> = [
    this.statusList[2],
    this.outcomeList[0],
    this.outcomeList[1],
    this.outcomeList[2],
  ];

  interviewStatusForm?: FormGroup;

  constructor(
    private ms: ModalControllerService,
    private iRequester: InterviewRequesterService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>): void {
    this.ms.openModalLg(template);
  }

  closeModal(): void {
    this.ms.closeModal();
  }

  onSubmit(f: FormGroup): void {
    console.log(this.slot);
    const str: string = f.value.status;
    let id: number = -1;

    if (this.slot?.id) {
      id = Number(this.slot.id);
    }

    // TODO streamline this?
    let errCount: number = 0;
    let isOutcome: boolean = true;
    for (let element of this.statusList) {
      if (str === element) {
        isOutcome = false;
        break;
      } else {
        errCount++;
      }
    }
    for (let element of this.outcomeList) {
      if (str === element) {
        isOutcome = true;
        break;
      } else {
        errCount++;
      }
    }

    if (errCount >= 6 || id == -1) {
      console.warn(
        'Probably nothing selected in the status menu before submission'
      );
      return;
    }
    this.iRequester.updateInterviewStatus(id, str, !isOutcome);
    f.reset();
  }
}
