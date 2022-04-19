import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestCenterService } from '../../requester/request-center.service';
import { availability, skills } from '../../requester/requestBodyTypes/types';

@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {


  // mytime?: string;
  modalRef?: BsModalRef

  availableInterviewObjects =<Array<CalendarEvent>> []
  availableInterviews = <Array<string>>[]

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
    this.rs.getInterviewByRecruiter(this.availableInterviewObjects);
    this.availableInterviewObjects.forEach(ele =>{
      this.availableInterviews.push(ele.start.getTime().toString());
    })
    this.rs.getAllApplicants(this.availableApplicants);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  onSubmit(f: FormGroup) {
    this.createInterviewForm.setValue(f.value);
    this.formSubmitted.emit(f);
    this.createInterviewForm.reset();
  }


}

