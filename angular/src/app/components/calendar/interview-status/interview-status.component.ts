import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.scss']
})
export class InterviewStatusComponent implements OnInit {

  @Input() slot?: CalendarEvent;

  statusForm: FormGroup = this.fb.group({
    status: ['']
  });

  myForm?: FormGroup;

  interviewStatusOptions: Array<string> = [];

  interviewerOptions: string[] = [
    'Pending',
    'Completed',
    'Candidate no show',
    'Panel no show'
  ];

  recruiterOptions: string[] = [
    'pending',
    'Panel no show'
  ];

  interviewStatusForm?: FormGroup;

  constructor(
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private fb: FormBuilder,
  ) { };

  ngOnInit() { };

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template)
  };

  closeModal(): void {
    this.ms.closeModal()
  };

  onSubmit(f: FormGroup): void {
    let str = f.value.status;
    let id: string | number | undefined;

    console.warn(this.slot)
    if (this.slot?.id) {
      id = this.slot.id
    }

    console.log(f.value);
    // this.rs.updateStatus(num, str, true)
    console.warn(id);
    console.warn(str);
    f.reset();
  }

}
