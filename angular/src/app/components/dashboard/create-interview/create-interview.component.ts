import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { RequestCenterService } from '../../requester/request-center.service';
import { skills } from '../../requester/requestBodyTypes/types';

@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})

export class CreateInterviewComponent implements OnInit {
  
  // mytime?: string;
  modalRef?: BsModalRef

  createInterviewForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
    skills: this.fb.array([
      this.fb.group({
        skillType: [''],
        skillLevel: ['']
      })
    ])
  })

  skillsRequired: FormGroup = this.fb.group({
    skillType: [''],
    skillLevel: ['']
  })

  get skills() {
    return this.createInterviewForm.get('skills') as FormArray; 
  }

  addSkill() {
    this.skills.push(this.fb.group({skill: [''], level: ['']}))
  }

  // skillTypes = [
  //   'Java', 'Python', 'Spring', 'C', 'C++', 'C#',
  //   'Haskell', 'Angular', 'JavaScript', 'VISUAL-BASIC',
  // ]

  // skillLevels = [
  //   'Level 1',
  //   'Level 2',
  //   'Level 3',
  // ]  
  skillsAvailable: skills[] = [];

  skillTypes: Set<string> = new Set<string>();

  //? As above
  skillLevels: Set<string> = new Set<string>();

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private fb: FormBuilder,
    private ms: BsModalService,
    private rs: RequestCenterService,
    ) { }

  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.skillTypes, this.skillLevels );

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  onSubmit(f: FormGroup) {
    this.createInterviewForm.setValue(f.value)
    console.log("create interview form")
    console.log(this.createInterviewForm.value)
    console.warn(this.createInterviewForm.get('firstDate')?.value)
    console.log(f.value.skills);
    var tempArr = [];
    var idArr = [];
    tempArr= f.value.skills;


    tempArr.forEach((skillReq: any) => {
      console.log(skillReq.skillType);
      this.skillsAvailable.forEach(skillStore => {
        if(skillStore.skillName === skillReq.skillType && skillStore.skillLevel === skillReq.skillLevel){
          idArr.push(skillStore.id);
          console.log("found id: " + skillStore.id); 
        }
      });
    });




    this.formSubmitted.emit(f);
    //TODO set up Requester service call @Sulkyoptimism
    // this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);

    this.createInterviewForm.reset();
  }


}

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