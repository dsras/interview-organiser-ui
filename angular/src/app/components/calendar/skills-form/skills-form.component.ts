import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { Subject } from 'rxjs';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { skills } from 'src/app/constants/types';

@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

  
  skillsMap: Map<number, string[]> = new Map<number, string[]>();

  levels: Set<string> = new Set<string>();

  skillsAvailable: skills[] = [];

  skillNamesAvailable: Set<string> = new Set<string>();

  addSkillsForm: FormGroup = this.fb.group ({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  })

  @Output() skillFormSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  action = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private ms: ModalControllerService
  ) { 

  }

  ngOnInit(): void {
      // TODO maybe put in parent as an input/output relationship
      this.rs.getAllSkills(this.skillsAvailable, this.skillNamesAvailable, this.levels );
      console.log("skillslist " + this.skillsAvailable.length)
  }

  openModal(template: TemplateRef<any>) {
    this.ms.openModal(template);
  }

  closeModal() {
    this.ms.closeModal()
  }

  onSubmit(f: FormGroup) {
    let skillName = JSON.stringify(f.value.skill);
    let skillLevel = JSON.stringify(f.value.level);
    skillName = skillName.slice(1,-1);
    skillLevel = skillLevel.slice(1,-1);
    let id = 0;
    this.skillsAvailable.forEach(element => {
      if(element.skillName === skillName && element.skillLevel === skillLevel){
        id = element.id;
      }
    });
    this.rs.addSkills(id);
    this.skillFormSubmitted.emit(f);
    f.reset();
  }

}
