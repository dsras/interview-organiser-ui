import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { RequestCenterService } from '../../requester/request-center.service';
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
    //! Add getSkillsMethod to init to populate form with current skills.
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  onSubmit(f: FormGroup) {
    //TODO console logging needs removed, only for demo purposes
    // console.log('f.value JSON string: ' + JSON.stringify(f.value));
    // console.log('this.completedForm before assignment: ' + JSON.stringify(this.createAvailabilityForm))
    //TODO Add POST request to submit f.value
    this.addSkillsForm.setValue(f.value);
    // console.log('this.completedForm after assignment: ' + JSON.stringify(this.createAvailabilityForm))
    // console.log(JSON.stringify(f.value.date))
    this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);
    this.skillFormSubmitted.emit(f);
    console.log(f.value)
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
