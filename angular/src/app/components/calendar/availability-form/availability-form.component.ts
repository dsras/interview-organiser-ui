import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { RequestCenterService } from '../../requester/request-center.service';

@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]

})

export class AvailabilityFormComponent implements OnInit {

  modalRef?: BsModalRef

  createAvailabilityForm: FormGroup = this.fb.group ({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange: ['', Validators.required],  
    firstDate: [''],
    lastDate: ['']
  })

  @Output() availabilityFormSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private ms: BsModalService
    ) { }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  onSubmit(f: FormGroup) {
    f.value.firstDate = f.value.dateRange[0]
    f.value.lastDate = f.value.dateRange[1]
    console.log(f.value.dateRange)
    console.log(f.value.dateRange[0])
    console.log(f.value.dateRange[1])

    console.log(f.value.firstDate)
    console.log(f.value.lastDate)

    this.rs.addAvailability(f.value.firstDate, f.value.lastDate, f.value.startTime, f.value.endTime);
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

