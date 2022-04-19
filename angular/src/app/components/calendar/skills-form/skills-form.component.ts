import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  // TODO output from calendar later?
  skillsAvailable: skills[] = [];

  skillNamesAvailable: Set<string> = new Set<string>();

  //? As above
  levels: Set<string> = new Set<string>();

  modalRef?: BsModalRef;

  addSkillsForm: FormGroup = this.fb.group ({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  })

  @Output() skillFormSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  action = new Subject<any>();

  //todo add Thorfinn's Services here
  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private ms: BsModalService    ) { 

  }

  ngOnInit(): void {
      //! Add getSkillsMethod to init topopulate form with current skills.
      // TODO maybe put in parent as an input/output relationship
      this.rs.getAllSkills(this.skillsAvailable, this.skillNamesAvailable, this.levels );
      console.log("skillslist " + this.skillsAvailable.length)
      // .forEach(element => {
      //   this.skillsMap.set(element.id, [element.skillName, element.skillLevel])
      //   this.skillsAvailable.push(element.skillName);
      // });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }
  //? anything to be saved
  onSubmit2(f: FormGroup) {
    this.skillFormSubmitted.emit(f);
  }


  test(){
    console.log("skillslist " + this.skillsAvailable.length);
  }

  onSubmit(f: FormGroup) {
    this.addSkillsForm.setValue(f.value);
    var skillName = JSON.stringify(f.value.skill);
    var skillLevel = JSON.stringify(f.value.level);
    skillName = skillName.slice(1,-1);
    skillLevel = skillLevel.slice(1,-1);
    var id = 0;
    this.skillsAvailable.forEach(element => {
      if(element.skillName === skillName && element.skillLevel === skillLevel){
        id = element.id;
        console.log("found id: " + id); 
      }
    });
    this.rs.addSkills(id);
    this.skillFormSubmitted.emit(f);
    this.addSkillsForm.reset();
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
