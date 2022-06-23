import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { CalendarUpdaterService } from 'src/app/services/calendar-updater.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { AvailabilityRequesterService } from 'src/app/services/requester/availability-requester.service';

/**
 * Form for collecting interviewer availability data and posting to DB
 */
@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
})
export class AvailabilityFormComponent implements OnInit {
  /**
   * Blank form to be populated by the user
   */
  @Output() callbackEmitter: EventEmitter<any> = new EventEmitter();

  message: string = '';
  subscription!: Subscription;
  submitted: boolean = false;
  tab: number = 0

  dateRangeForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
  });

  multiDayForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    days: this.fb.array([
      this.fb.group({ weekday: ['', Validators.required] }),
    ]),
    weeks: ['1', [Validators.required, Validators.min(1)]],
  });

  formSelector: FormGroup = this.fb.group({ range: [true] });

  weekendFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogService,
    private aRequester: AvailabilityRequesterService,
    private updater: CalendarUpdaterService,
    private _snackbar: MatSnackBar
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.subscription = this.updater.currentUpdateMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  /** @ignore */
  openDialog(template: TemplateRef<HTMLElement>): void {
    this._dialog.openAvailabilityForm(template);
    this._dialog.dialogRef?.afterClosed().subscribe(() => {
      this.multiDayForm.reset();
      this.resetDays();
      this.dateRangeForm.reset();
      if (this.submitted) {
        this.updateCalendar()
      }
    });
  }

  rangeDialog(): void {
    this._dialog.rangeResize();
  }

  tabChange($event: MatTabChangeEvent): void {
    this.tab = $event.index;
    switch (this.tab) {
      case 0:
        this._dialog.selectResize(this.days.length);
        break;
      case 1:
        this._dialog.rangeResize();
        this.resetDays();
        break;
    }
  }

  updateCalendar() {
    this.updater.update(new Date().toString());
  }

  /**
   * Accepts a completed form populated by user to be sent to database
   *
   * @param {FormGroup} form completed FormGroup to be submitted
   */
  onSubmit(form: FormGroup): void {
    console.log(form.value)
    console.log(`Tab: ${this.tab}`)
    if (this.tab === 0) {
      this.aRequester.addAvailabilityArray(form.value).subscribe(() => {
        console.log(form.value)
        this.submitted = true;
      });
    } else {
      this.aRequester.addAvailabilityRange(form.value).subscribe((data) => {
        console.log(data)
        this.submitted = true;
      });
    }
    this._dialog.closeDialog();
  }

  get days() {
    return this.multiDayForm.controls['days'] as FormArray;
  }

  addRecurringDay() {
    if (this.days.length < 5) {
      const dayForm = this.fb.group({
        weekday: ['', Validators.required],
      });
      this.days.push(dayForm);
      this._dialog.selectResize(this.days.length);
    } else {
      const config: MatSnackBarConfig = {
        duration: 1000,
        verticalPosition: 'top',
      };
      this._snackbar.open('5 days is the limit', undefined, config);
    }
  }

  deleteRecurringDay(lessonIndex: number) {
    this.days.removeAt(lessonIndex);
    this._dialog.selectResize(this.days.length);
  }

  dummySubmit(form: FormGroup): void {
    console.log(form.value);
    form.reset();
  }

  private resetDays(): void {
    this.multiDayForm.setControl(
      'days',
      this.fb.array([this.fb.group({ weekday: ['', Validators.required] })])
    );
  }
}
