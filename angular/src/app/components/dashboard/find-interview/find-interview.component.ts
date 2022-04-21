import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { Observable } from 'rxjs';
import { RequestCenterService } from '../../requester/request-center.service';
import { availabilityForInterviews, skills } from '../../requester/requestBodyTypes/types';

@Component({
  selector: 'find-interview',
  templateUrl: './find-interview.component.html',
  styleUrls: ['./find-interview.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})

export class FindInterviewComponent implements OnInit {

  // buttonPressed: boolean = false;

  skillsAvailable: skills[] = [];

  skillTypes: Set<string> = new Set<string>();

  //? As above
  skillLevels: Set<string> = new Set<string>();
  // mytime?: string;
  modalRef?: BsModalRef

  availableInterviewObjects =<Array<CalendarEvent>> [];
  availableInterviews =<Array<string>> [];
  availableInterviews$!:Observable<Array<CalendarEvent>> ;
  

  availableApplicants = <Array<string>>[]
  availableApplicants$!:Observable<Array<CalendarEvent>> ;

  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    // applicantSelected: ['', Validators.required]
    additionalInformation: ['', Validators.maxLength(255)]
  })

  findInterviewsForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
    skills: this.fb.group({
        skillType: ['', Validators.required],
        skillLevel: ['', Validators.required]
    })
  })

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private fb: FormBuilder,
    private ms: BsModalService,
    private rs: RequestCenterService,
    ) { }

  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.skillTypes, this.skillLevels );
    //this.rs.getAllAvailabilityUI(this.availableInterviews);
    // this.availableInterviewObjects.forEach(ele =>{
    //   this.availableInterviews.push(ele.start.getTime().toString());
    // })
    //this.rs.getAllApplicants(this.availableApplicants);
  }

  openModal(template: TemplateRef<any>) {
    console.log("open template");
    this.modalRef = this.ms.show(template);
  }

  findInterview(f: FormGroup) {
    this.findInterviewsForm.setValue(f.value);
    console.log("create interview form !!!!!!!!!!!!");
    // console.log(this.findInterviewsForm.value)
    // console.warn(this.findInterviewsForm.get('firstDate')?.value)
    // console.log(f.value.firstDate);
    var tempArr = [];
    var idArr = <Array<number>>[];
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

    //this.rs.getAvailabilityByRange(f.value.firstDate, f.value.lastDate, f.value.startTime, f.value.endTime, idArr);
    this.formSubmitted.emit(f);
    //TODO set up Requester service call @Sulkyoptimism
    // this.rs.addAvailability(f.value.date, f.value.startTime, f.value.endTime);
    this.findInterviewsForm.reset();
  }

  buttonClicked(f: FormGroup) {
    console.log("open button");
    console.log(f);
    console.log(f.value.skills);

    var tempArr = [];
    var idArr = <Array<number>>[];
    tempArr= f.value.skills;

    var skillReq = {
      skillType: f.value.skills.skillType,
      skillLevel: f.value.skills.skillLevel
    }

    this.skillsAvailable.forEach(skillStore => {
      if(skillStore.skillName === skillReq.skillType && skillStore.skillLevel === skillReq.skillLevel){
        idArr.push(skillStore.id);
        console.log("found id: " + skillStore.id); 
      }
    });
    this.rs.getAvailabilityByRange(f.value.firstDate, f.value.lastDate, f.value.startTime, f.value.endTime, idArr, this.availableInterviews);

    let find = document.getElementById("find");
    let confirm = document.getElementById("confirm")
    if (find?.style.display === "block" && confirm?.style.display === "none") {
      find.style.display = "none"
      confirm.style.display = "block"      
    }
    console.log(this.findInterviewsForm)
    //  if (find?.style.display === "none" && confirm?.style.display === "block") {
    //   find.style.display = "block"
    //   confirm.style.display = "none"
    // }
  }

  submitInterview(f: FormGroup) {
    this.createInterviewForm.setValue(f.value);
    this.formSubmitted.emit(f);
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