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
  trueData: string[] = [];

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
    additionalInformation: ['', Validators.maxLength(255)],
    startTime: ['']
  })

  findInterviewsForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange:['', Validators.required],
    skills: this.fb.group({
        skillType: ['', Validators.required],
        skillLevel: ['', Validators.required]
    })
  })

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
    // console.log("open button");
    // console.log(f);
    // console.log(f.value.skills);

    var idArr = <Array<number>>[];

    var skillReq = {
      skillType: f.value.skills.skillType,
      skillLevel: f.value.skills.skillLevel
    }

    this.skillsAvailable.forEach(skillStore => {
      if(skillStore.skillName === skillReq.skillType && skillStore.skillLevel === skillReq.skillLevel){
        idArr.push(skillStore.id);
        // console.log("found id: " + skillStore.id); 
      }
    });
    this.rs.getAvailabilityByRange(
      f.value.dateRange[0], 
      f.value.dateRange[1], 
      f.value.startTime, 
      f.value.endTime, 
      idArr, 
      this.availableInterviews);

    this.trueData.push(f.value.startTime);
    this.trueData.push(f.value.endTime);

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
    console.log("sumbit button");
    console.log(f.value);

    this.rs.addInterviewForm(f.value.interviewSelected, f.value.additionalInformation, f.value.startTime, f.value.endTime);
    this.createInterviewForm.reset();
    console.log(f.value);

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