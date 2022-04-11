import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { RequestCenterService } from '../../requester/request-center.service';


@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss']
})


export class AvailabilityFormComponent implements OnInit {

  availabilityForm = this.fb.group ({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    date: ['', Validators.required],
  })

  static events: CalendarEvent [];

  action = new Subject<any>();

  
  @Output() completedForm!: JSON;

  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService
    ) { }

  ngOnInit(): void {}


  onSubmit(f: FormGroup) {
    //TODO console logging needs removed, only for demo purposes
    console.log('f.value JSON string: ' + JSON.stringify(f.value));
    console.log('this.completedForm before assignment: ' + JSON.stringify(this.completedForm))
    //TODO Add POST request to submit f.value
    this.completedForm = f.value;
    console.log('this.completedForm after assignment: ' + JSON.stringify(this.completedForm))
    this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);
  }

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
