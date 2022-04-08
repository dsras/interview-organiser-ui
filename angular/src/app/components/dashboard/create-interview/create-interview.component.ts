import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {

  createInterviewForm: FormGroup = this.fb.group({
    start: [''],
    end: [''],
    firstDate: [''],
    lastDate: ['']
    //? add additional params
  })

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output() trueOrFalse!: Boolean;

  booleanButton() : void {
    this.trueOrFalse = !this.trueOrFalse
    console.log(this.trueOrFalse)
  }

  onSubmit(f: FormGroup) {
    this.createInterviewForm.setValue(f.value)
    console.log("create interview form")
    console.log(this.createInterviewForm.value)
    console.warn(this.createInterviewForm.get('firstDate')?.value)
    this.formSubmitted.emit(f);
  }

  constructor(
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
  }

}
