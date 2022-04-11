import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

  //? Should this be pulled from DB or better to store in frontend
  skills = [
    'Java', 'Python', 'Spring', 'C', 'C++', 'C#',
    'Haskell', 'Angular', 'JavaScript', 'VISUAL-BASIC',
  ]

  //? As above
  levels = [
    'Level 1',
    'Level 2',
    'Level 3',
    'Level 4',
    'Level 5',
  ]

  skillsForm = this.fb.group ({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  })

  static events: CalendarEvent [];

  action = new Subject<any>();

  //todo add Thorfinn's Services here
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //! Add getSkillsMethod to init topopulate form with current skills.
  }

  onSubmit(f: FormGroup) {
    //TODO Replace console log with POST method 
    console.log(JSON.stringify(f.value));
  }

//* test methods
  yell(): void {
    console.log('Yell')
  }

  onYesClick() {
    this.action.next('yes');
  }

  onNoClick() {
    this.action.next('No');
  }

}
