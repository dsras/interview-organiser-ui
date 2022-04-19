import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestCenterService } from '../../requester/request-center.service';

@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {


  // mytime?: string;
  modalRef?: BsModalRef

  availableInterviews = []

  availableApplicants = []

  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    applicantSelected: ['', Validators.required]
  })


  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private fb: FormBuilder,
    private ms: BsModalService,
    private rs: RequestCenterService,
    ) { }

  ngOnInit(): void {
    // this.availableInterviews = GETREQUESTBODY
    // this.availableApplicants = GETREQUESTBODY
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  onSubmit(f: FormGroup) {
    this.createInterviewForm.setValue(f.value)
    console.log("create interview form")
    console.log(this.createInterviewForm.value)
    console.warn(this.createInterviewForm.get('firstDate')?.value)
    this.formSubmitted.emit(f);
    //TODO set up Requester service call @Sulkyoptimism
    // this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);

    this.createInterviewForm.reset();
  }


}

