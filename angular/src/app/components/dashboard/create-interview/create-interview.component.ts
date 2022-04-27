import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {

  // mytime?: string;
  modalRef?: BsModalRef

  availableInterviewObjects =<Array<CalendarEvent>> [];
  availableInterviews =<Array<string>> [];
  availableInterviews$!:Observable<Array<CalendarEvent>> ;
  
  availableApplicants = <Array<string>>[]
  availableApplicants$!:Observable<Array<CalendarEvent>> ;

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
    console.log("this is the init for create!!!!!!!!!");
    this.rs.getAllAvailabilityUI(this.availableInterviews);

    console.log("Confirm after");


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

