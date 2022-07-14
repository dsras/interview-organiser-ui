import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import {
  outcomeOptions,
  statusOptions,
} from 'src/app/shared/constants/interview-options.constant';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { CalendarUpdaterService } from 'src/app/services/calendar-updater.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * Component to view and modify interview status
 *
 * TODO Filter form options depending on the roles of logged in user.
 * TODO onSubmit options to select whether updating a status or outcome.
 */
@Component({
  selector: 'interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.scss'],
})
export class InterviewStatusComponent implements OnInit, OnDestroy {
  /** The time slot being displayed */
  @Input() slot?: CalendarEventInterview;
  userRoles!: string[];
  destroy$: Subject<boolean> = new Subject();

  /** Form for updating interview status */
  statusForm: FormGroup = this.fb.group({
    status: [''],
  });
  /** Available status options */
  statusOptions = statusOptions;
  /** Available outcome options */
  outcomeOptions = outcomeOptions;
  /** Options for a recruiter to select */
  interviewerOptions: Array<string> = [
    this.statusOptions.completed,
    this.statusOptions.candidateNoShow,
  ];
  /** Options for an interviewer to select */
  recruiterOptions: Array<string> = [
    this.statusOptions.panelNoShow,
    this.outcomeOptions.progressed,
    this.outcomeOptions.didNotProgress,
  ];

  /** @ignore */
  constructor(
    private _dialog: MatDialogService,
    private fb: FormBuilder,
    private iRequester: InterviewRequesterService,
    private userService: GetUserDataService,
    private updater: CalendarUpdaterService
  ) {}

  /** @ignore */
  ngOnInit() {
    this.userRoles = this.userService.getUserRoleNames();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** @ignore */
  openModal(template: TemplateRef<any>): void {
    this._dialog.openDialog(template);
    this._dialog.dialogRef
      ?.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.statusForm.reset();
      });
  }

  /** @ignore */
  closeModal(): void {
    this._dialog.closeDialog();
  }

  /**
   * Function to be called on click of the submit button
   */
  onSubmit(form: FormGroup): void {
    const status: string = form.value.status;
    const id: number = this.slot?.id ? Number(this.slot.id) : -1;

    // TODO streamline this?
    const isStatus: boolean = Object.values(this.statusOptions).includes(
      form.value.status
    );
    this.iRequester.updateInterviewStatus(id, status, isStatus);
    this.updater.updateCalendar();
  }
}
