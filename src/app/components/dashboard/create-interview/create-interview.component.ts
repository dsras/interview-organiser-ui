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
import { CalendarUpdaterService } from 'src/app/services/calendar-updater.service';

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

  viewCreate: boolean = false;

  panelOpenState: boolean = false;

  /** Array of availability as strings to be used in form selection */
  availableInterviews: Array<AvailabilityForInterviews> = [];

  /** Iterview creation from selected attributes form */
  createInterviewForm: FormGroup = this.fb.group({
    interviewSelected: ['', Validators.required],
    additionalInformation: ['', Validators.maxLength(255)],
    startTime: ['',],
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
    private iRequester: InterviewRequesterService,
    private updater: CalendarUpdaterService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.skillOptions);
  }

  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this._dialog.openDialog(template);
    this._dialog.dialogRef?.afterClosed().subscribe(() => {
      this.findInterviewsForm.reset();
      this.createInterviewForm.reset();
      this.viewCreate = false;
    });
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
  // todo form value passed to function with typing
  findInterview(form: FormGroup): void {
    const idArray: Array<number> = [];

    let skillReq = {
      skillName: form.value.skills.skillName,
      skillLevel: form.value.skills.skillLevel,
    };

    this.skillsAvailable.forEach((skillStore) => {
      if (
        skillStore.skillName === skillReq.skillName &&
        skillStore.skillLevel === skillReq.skillLevel
      ) {
        idArray.push(skillStore.id);
      }
    });
    this.availableInterviews = [];

    this.aRequester.getSlots(form.value, idArray).subscribe((returnData) => {
      console.table(returnData);
      const newStartDate: Date = new Date(form.value.firstDate);
      const newStartTime: Date = new Date(form.value.startTime);
      const newEndTime: Date = new Date(form.value.endTime);

      newStartTime.setDate(newStartDate.getDate());
      newEndTime.setDate(newStartDate.getDate());

      let data = <Array<AvailabilityForInterviews>>returnData;
      data.forEach((element) => {
        let refStart: Date = new Date(newStartTime);
        let refEnd: Date = new Date(newStartTime);
        refStart.setHours(
          Number.parseInt(element.startTime.split(':')[0]),
          Number.parseInt(element.startTime.split(':')[1])
        );
        refEnd.setHours(
          Number.parseInt(element.endTime.split(':')[0]),
          Number.parseInt(element.endTime.split(':')[1])
        );

        let startInput: string =
          refStart.getTime() > newStartTime.getTime()
            ? this.aRequester.dateToStringTime(refStart)
            : this.aRequester.dateToStringTime(newStartTime);

        let endInput: string =
          refEnd.getTime() < newEndTime.getTime()
            ? this.aRequester.dateToStringTime(refEnd)
            : this.aRequester.dateToStringTime(newEndTime);

        this.availableInterviews.push(element);
      });
    });
    this.switchView();
  }

  /**
   * Submit the interview attributes to {@link iRequester.addInterviewForm}
   *
   * @param form completed form of interview attributes
   */
  // todo form value passed to function with typing
  submitInterview(form: FormGroup): void {
    this.iRequester.addInterviewForm(form.value).subscribe(() => {
      form.reset();
      this.updater.updateCalendar();
    });
  }

  /** Switches which form is being viewed */
  switchView(): void {
    this.viewCreate = !this.viewCreate;
  }
}
