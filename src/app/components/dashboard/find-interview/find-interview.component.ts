import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { SkillOptions, skills } from '../../../shared/models/types';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

@Component({
  selector: 'find-interview',
  templateUrl: './find-interview.component.html',
  styleUrls: ['./find-interview.component.scss'],
})
export class FindInterviewComponent implements OnInit {
  skillsAvailable: skills[] = [];
  trueData: string[] = [];

  skillOptions: SkillOptions = {
    names: new Set<string>(),
    levels: new Set<string>(),
  };

  availableInterviewObjects: Array<CalendarEvent> = [];
  availableInterviews: Array<string> = [];
  availableInterviews$!: Observable<Array<CalendarEvent>>;

  availableApplicants: Array<string> = [];
  availableApplicants$!: Observable<Array<CalendarEvent>>;

  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    additionalInformation: ['', Validators.maxLength(255)],
    startTime: [''],
  });

  findInterviewsForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
    skills: this.fb.group({
      skillType: ['', Validators.required],
      skillLevel: ['', Validators.required],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private aRequester: AvailabilityRequesterService,
    private iRequester: InterviewRequesterService
  ) {}

  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.skillOptions);
    //this.rs.getAllAvailabilityUI(this.availableInterviews);
    // this.availableInterviewObjects.forEach(ele =>{
    //   this.availableInterviews.push(ele.start.getTime().toString());
    // })
    //this.rs.getAllApplicants(this.availableApplicants);
  }

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  closeModal(): void {
    this.ms.closeModal();
  }

  findInterview(form: FormGroup | any): void {
    let idArr: number[] = <Array<number>>[];
    let skillReq = {
      skillType: form.value.skills.skillType,
      skillLevel: form.value.skills.skillLevel,
    };

    this.skillsAvailable.forEach((skillStore) => {
      if (
        skillStore.skillName === skillReq.skillType &&
        skillStore.skillLevel === skillReq.skillLevel
      ) {
        idArr.push(skillStore.id);
      }
    });

    this.aRequester.getAvailabilityByRange(
      form.value.firstDate,
      form.value.lastDate,
      form.value.startTime,
      form.value.endTime,
      idArr,
      this.availableInterviews
    );

    this.trueData.push(form.value.startTime);
    this.trueData.push(form.value.endTime);

    let find: HTMLElement | null = document.getElementById('find');
    let confirm: HTMLElement | null = document.getElementById('confirm');
    if (find?.style.display === 'block' && confirm?.style.display === 'none') {
      find.style.display = 'none';
      confirm.style.display = 'block';
    }
  }

  submitInterview(form: FormGroup | any): void {
    // todo make sure this lines up with correct functionality
    this.iRequester.addInterviewForm(
      form.value.interviewSelected,
      form.value.additionalInformation,
      form.value.startTime
    );
    this.createInterviewForm.reset();
  }
}
