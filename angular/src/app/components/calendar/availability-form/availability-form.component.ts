import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

/**
 * Form for collecting interviewer availability data and posting to DB
 */
@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]

})

export class AvailabilityFormComponent implements OnInit {
  
  /**
   * Blank form to be populated by the user
   */
  createAvailabilityForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange: ['', Validators.required],
  })

  @Output() availabilityFormSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private ms: ModalControllerService
  ) { }

  ngOnInit(): void { }

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template)
  }

  closeModal(): void {
    this.ms.closeModal()
  }

  onSubmit(f: FormGroup): void {
    this.rs.addAvailability(f.value.dateRange[0], f.value.dateRange[1], f.value.startTime, f.value.endTime);
    f.reset();
  }

}

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 15,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}

