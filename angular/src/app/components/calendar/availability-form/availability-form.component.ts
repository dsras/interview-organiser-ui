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

  mytime?: string;
  modalRef?: BsModalRef

  createAvailabilityForm: FormGroup = this.fb.group ({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    date: ['', Validators.required],
  })

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


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
    //TODO console logging needs removed, only for demo purposes
    // console.log('f.value JSON string: ' + JSON.stringify(f.value));
    // console.log('this.completedForm before assignment: ' + JSON.stringify(this.createAvailabilityForm))
    //TODO Add POST request to submit f.value
    this.createAvailabilityForm.setValue(f.value);
    // console.log('this.completedForm after assignment: ' + JSON.stringify(this.createAvailabilityForm))
    // console.log(JSON.stringify(f.value.date))
    this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);
    this.formSubmitted.emit(f);
  }

  // onSubmit(f: FormGroup) {
  //   this.createInterviewForm.setValue(f.value)
  //   console.log("create interview form")
  //   console.log(this.createInterviewForm.value)
  //   console.warn(this.createInterviewForm.get('firstDate')?.value)
  //   this.formSubmitted.emit(f);
  // }

  

  //TODO re-evaluate where this code should exist if anywhere
  // static addEventRef(events: CalendarEvent []){
  //   AvailabilityFormComponent.events = events;
  //   const out = document.getElementById("output");
  //   const text = document.createElement('p');
  //   text.textContent += AvailabilityFormComponent.events[0].start.toLocaleString().substring(0,10) + "\n";

  //   events.forEach(appointment => {
  //     console.log(events.length);
  //     var start = appointment.start;
  //     var end = appointment.end;
  //     text.textContent += start.toLocaleString().substring(12);
  //     text.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
  //   });
  //   out?.append(text);


  // }

  // public test!: string;

  // setFormData(data: any): void {
  //   this.test = data;

  // }

}

//TODO Place this function in a service made available to all modals with timepickers
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