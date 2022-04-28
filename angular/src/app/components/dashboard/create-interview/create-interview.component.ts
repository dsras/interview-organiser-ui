import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {

  availableInterviewObjects: Array<CalendarEvent> = [];
  availableInterviews: Array<string> = [];
  availableInterviews$!: Observable<Array<CalendarEvent>>;

  availableApplicants: Array<string> = []
  availableApplicants$!: Observable<Array<CalendarEvent>>;

  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    applicantSelected: ['', Validators.required]
  })

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private rs: RequestCenterService,
  ) { }

  ngOnInit(): void {
    this.rs.getAllAvailabilityUI(this.availableInterviews);
    this.rs.getAllApplicants(this.availableApplicants);
  }

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  closeModal(): void {
    this.ms.closeModal();
  }

  onSubmit(f: FormGroup): void {
    this.createInterviewForm.setValue(f.value);
    this.formSubmitted.emit(f);
    this.createInterviewForm.reset();
  }


}

