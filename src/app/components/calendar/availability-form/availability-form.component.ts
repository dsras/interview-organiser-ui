import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

/**
 * Form for collecting interviewer availability data and posting to DB
 */
@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
})
export class AvailabilityFormComponent implements OnInit {
  /**
   * Blank form to be populated by the user
   */
  createAvailabilityForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange: ['', Validators.required],
  });
  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private aRequester: AvailabilityRequesterService
  ) {}
  /** @ignore */
  ngOnInit(): void {}
  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }
  /** @ignore */
  closeModal(): void {
    this.ms.closeModal();
  }

  /**
   * Accepts a completed form populated by user to be sent to database
   *
   * @param {FormGroup} form completed FormGroup to be submitted
   */
  onSubmit(form: FormGroup | any): void {
    this.aRequester.addAvailability(
      form.value.dateRange[0],
      form.value.dateRange[1],
      form.value.startTime,
      form.value.endTime
    );
    form.reset();
  }
}
