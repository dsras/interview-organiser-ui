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

  @Input() slot?: CalendarEvent

  statusForm = this.fb.group({
    status: ['']
  })

  myForm?: FormGroup;

  interviewStatusOptions: Array<string> = [];

  interviewerOptions = [
    'Pending',
    'Completed', 
    'Candidate no show',
    'Panel no show'
  ]

  recruiterOptions = [
    'pending',
    'Panel no show'
  ]

  interviewStatusForm?: FormGroup

  constructor(
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

  openModal(template: TemplateRef<any>) {
    this.ms.openModal(template)
  }

  closeModal() {
    this.ms.closeModal()
  }

  onSubmit(f: FormGroup) {
    let str = f.value.status;
    let num = -1

    console.warn(this.slot)
    if (this.slot?.id) {
      num = this.slot.id
    }

    console.log(f.value);
    // this.rs.updateStatus(num, str, true)
    console.warn(num);
    console.warn(str);
    f.reset();
  }

}
