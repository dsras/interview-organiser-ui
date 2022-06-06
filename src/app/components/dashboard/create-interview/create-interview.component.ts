import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import {
  AvailabilityForInterviews,
  SkillOptions,
  Skills,
} from '../../../shared/models/types';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

/** Component for finding savailability for interview and creating them */
@Component({
  selector: 'create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss'],
})
export class CreateInterviewComponent implements OnInit {
  /** Array of skills */
  skillsAvailable: Skills[] = [];
  /** Options for filtering by skill */
  skillOptions: SkillOptions = {
    skillNames: new Set<string>(),
    skillLevels: new Set<string>(),
  };

  /** Array of availability as strings to be used in form selection */
  availableInterviews: Array<AvailabilityForInterviews> = [];

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
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
    skills: this.fb.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required],
    }),
  });

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogService,
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
    this._dialog.openDailogTall(template);
  }

  /** @ignore */
  closeModal(): void {
    this._dialog.closeDialog();
  }

  /**
   * Takes search criteria for creating an interview and populates the create
   * interview form with appropriate data
   *
   * @param form completed search criteria form
   */
  findInterview(form: FormGroup): void {
    let idArr: Array<number> = [];
    let skillReq = {
      skillName: form.value.skills.skillType,
      skillLevel: form.value.skills.skillLevel,
    };

    this.skillsAvailable.forEach((skillStore) => {
      if (
        skillStore.skillName === skillReq.skillName &&
        skillStore.skillLevel === skillReq.skillLevel
      ) {
        idArr.push(skillStore.id);
      }
    });
    console.log(idArr);
    this.availableInterviews = [];

    this.aRequester.getInterviewSlots(
      form.value,
      idArr,
      this.availableInterviews
    );
    form.reset();
    this.switchView('');
  }

  /**
   * Submit the interview attributes to {@link iRequester.addInterviewForm}
   *
   * @param form completed form of interview attributes
   */
  submitInterview(form: FormGroup): void {
    this.iRequester.addInterviewForm(form.value);
    form.reset();
  }

  /** Switches which form is being viewed */
  switchView(disp: string): void {
    const find: HTMLElement = document.getElementById('find')!;
    const confirm: HTMLElement = document.getElementById('confirm')!;
    if (!disp || disp == '') {
      try {
        disp = find.style.display;
      } catch (error) {
        console.log(error);
      }
    }
    switch (disp) {
      case 'none':
        find.style.display = 'block';
        confirm.style.display = 'none';
        break;
      case 'block':
        find.style.display = 'none';
        confirm.style.display = 'block';
        break;
      default:
        break;
    }
  }
}
