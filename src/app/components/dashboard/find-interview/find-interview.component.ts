import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { SkillOptions, Skills } from '../../../shared/models/types';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

@Component({
  selector: 'find-interview',
  templateUrl: './find-interview.component.html',
  styleUrls: ['./find-interview.component.scss'],
})
export class FindInterviewComponent implements OnInit {
  /** Array of skills */
  skillsAvailable: Skills[] = [];
  /** Options for filtering by skill */
  skillOptions: SkillOptions = {
    skillNames: new Set<string>(),
    skillLevels: new Set<string>(),
  };

  /** Array of availability as strings to be used in form selection */
  availableInterviews: Array<string> = [];

  /** Iterview creation from selected attributes form */
  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    additionalInformation: ['', Validators.maxLength(255)],
    startTime: [''],
  });

  /** Search for availability for selected criteria form  */
  findInterviewsForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    dateRange:['', Validators.required],
    skills: this.fb.group({
      skillType: ['', Validators.required],
      skillLevel: ['', Validators.required],
    }),
  });

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private aRequester: AvailabilityRequesterService,
    private iRequester: InterviewRequesterService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.skillOptions);
  }

  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  /** @ignore */
  closeModal(): void {
    this.ms.closeModal();
  }

  /**
   * Takes search criteria for creating an interview and populates the create
   * interview form with appropriate data
   *
   * @param form completed search criteria form
   */
  findInterview(form: FormGroup | any): void {
    let idArr: Array<number> = [];
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
      form.value.dateRange[0],
      form.value.dateRange[1],
      form.value.startTime,
      form.value.endTime,
      idArr,
      this.availableInterviews
    );
    form.reset();
    this.switchView();
  }

  /**
   * Submit the interview attributes to {@link iRequester.addInterviewForm}
   *
   * @param form completed form of interview attributes
   */
  submitInterview(form: FormGroup | any): void {
    this.iRequester.addInterviewForm(
      form.value.interviewSelected,
      form.value.additionalInformation,
      form.value.startTime
    );
    form.reset();
  }

  /** Switches which form is being viewed */
  switchView(): void {
    const find: HTMLElement = document.getElementById('find')!;
    const confirm: HTMLElement = document.getElementById('confirm')!;
    switch (find.style.display) {
      case 'none':
        find.style.display = 'block';
        confirm.style.display = 'none';
        break;
      case 'block':
        find.style.display = 'none';
        confirm.style.display = 'block';
        break;
    }
  }
}
