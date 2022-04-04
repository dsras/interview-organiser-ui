import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { VerticalDirection } from 'ag-grid-community';

@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss']
})


export class AvailabilityFormComponent implements OnInit {


  @Output() event:EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  yell(): void {
    console.log('Yell')
  }

  onSubmit() {
    console.warn(this.availabilityForm.value.timeSlot, this.availabilityForm.value.date);
  }

  // availabilityForm = new FormGroup ({
  //   timeSlot: new FormGroup ({
  //     startTime: new FormControl(''),
  //     endTime: new FormControl(''),
  //   }),
  //   date : new FormControl(''),
  // });

  availabilityForm = this.fb.group ({
    timeSlot: this.fb.group ({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    }),
    date: ['', Validators.required],
  })

}
