import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]

})

export class AvailabilityFormComponent implements OnInit {

  createAvailabilityForm: FormGroup = this.fb.group ({
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

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.ms.openModal(template)
  }

  closeModal() {
    this.ms.closeModal()
  }

  onSubmit(f: FormGroup) {
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

