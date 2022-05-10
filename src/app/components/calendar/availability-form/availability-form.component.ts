import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
// import { getTimepickerConfig } from 'src/app/common/functions/get-timepicker-config';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

/**
 * * Form for collecting interviewer availability data and posting to DB
 */
@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
  // providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class AvailabilityFormComponent implements OnInit {
  /** 
   * * Blank form to be populated by the user 
   */
  createAvailabilityForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange: ['', Validators.required],
  });

  /**
   * *EventEmitter if parent is listening for form submission 
   */
  @Output() availabilityFormSubmitted: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private aRequester: AvailabilityRequesterService
  ) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  closeModal(): void {
    this.ms.closeModal();
  }

  /**
   * Accepts a completed form populated by user to be sent to database
   * 
   * @param f completed FormGroup to be submitted
   */
  onSubmit(f: FormGroup): void {
    this.aRequester.addAvailability(
      f.value.dateRange[0],
      f.value.dateRange[1],
      f.value.startTime,
      f.value.endTime
    );
    f.reset();
  }
}
