import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { RequestCenterService } from '../../requester/request-center.service';
import { skills } from '../../requester/requestBodyTypes/types';
@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

  
  skillsMap: Map<number, string[]> = new Map<number, string[]>();
  // //? Should this be pulled from DB or better to store in frontend
  // skills = [
  //   'Java', 'Python', 'Spring', 'C', 'C++', 'C#',
  //   'Haskell', 'Angular', 'JavaScript', 'VISUAL-BASIC',
  // ]

  // //? As above
  // levels = [
  //   'Level 1',
  //   'Level 2',
  //   'Level 3',
  //   'Level 4',
  //   'Level 5',
  // ]  
  //? Should this be pulled from DB or better to store in frontend
  skillsAvailable: skills[] = [

  ]

  skillNamesAvailable: Set<string> = new Set<string>();

  //? As above
  levels: Set<string> = new Set<string>();

  skillsForm = this.fb.group ({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  })

  static events: CalendarEvent [];

  action = new Subject<any>();

  //todo add Thorfinn's Services here
  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    ) { }

  ngOnInit(): void {
    //! Add getSkillsMethod to init topopulate form with current skills.
    this.rs.getAllSkills(this.skillsAvailable, this.skillNamesAvailable, this.levels );

    console.log("skillslist " + this.skillsAvailable.length);
    //.forEach(element => {
    //   this.skillsMap.set(element.id, [element.skillName, element.skillLevel])
    //   this.skillsAvailable.push(element.skillName);
    // });
   
  }
  test(){
    console.log("skillslist " + this.skillsAvailable.length);

  }

  onSubmit(f: FormGroup) {
    //TODO Replace console log with POST method 
    console.log(`POST body: ${JSON.stringify(f.value)}`);
    console.log(`some more body: ${f.value} `)
    var skillName = JSON.stringify(f.value.skill);
    var skillLevel = JSON.stringify(f.value.level);
    var id = 0;
    this.skillsAvailable.forEach(element => {
      if(element.skillName == skillName && element.skillLevel == skillLevel){
        id = element.id;
        
      }
    });
    this.rs.addSkills(id, skillName, skillLevel);
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
