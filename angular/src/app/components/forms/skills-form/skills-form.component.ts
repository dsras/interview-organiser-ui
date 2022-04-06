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

  skills = [
    'Java', 'Python', 'Spring', 'C', 'C++', 'C#',
    'Haskell', 'Angular', 'JavaScript', 'VISUAL-BASIC',
  ]


  static events: CalendarEvent [];

  action = new Subject<any>();


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  yell(): void {
    console.log('Yell')
  }

  onYesClick() {
    this.action.next('yes');
  }

  onNoClick() {
    this.action.next('No');
  }

  onSubmit(f: FormGroup) {
    console.log(JSON.stringify(f.value));
  }

 
  skillsForm = this.fb.group ({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  })

  // static addEventRef(events: CalendarEvent []){
  //   SkillsFormComponent.events = events;
  //   const out = document.getElementById("output");
  //   const text = document.createElement('p');
  //   text.textContent += SkillsFormComponent.events[0].start.toLocaleString().substring(0,10) + "\n";

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
