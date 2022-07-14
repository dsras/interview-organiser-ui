import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
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
export class AvailabilityFormComponent implements OnInit, OnDestroy {
  currentTab: number = 0;
  destroy$: Subject<boolean> = new Subject();

  /**
   * Blank form to be populated by the user
   */
  dateRangeForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
  });

  /**
   * Blank form to be populated by the user
   */
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
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** @ignore */
  openDialog(template: TemplateRef<HTMLElement>): void {
    this._dialog.openDialog(template);
    this._dialog.dialogRef
      ?.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.multiDayForm.reset();
        this.resetDays();
        this.dateRangeForm.reset();
      });
  }

  rangeDialog(): void {
    this._dialog.resize();
  }

  tabChange(event: MatTabChangeEvent): void {
    this.currentTab = event.index;
    this._dialog.resize();
  }

  /**
   * Accepts a completed form populated by user to be sent to database
   *
   * @param {FormGroup} form completed FormGroup to be submitted
   */
  onSubmit(form: FormGroup): void {
    switch (this.currentTab) {
      case 0: {
        this.aRequester
          .addAvailabilityArray(form.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.updater.updateCalendar();
          });
        break;
      }
      case 1: {
        this.aRequester
          .addAvailabilityRange(form.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log(data);
            this.updater.updateCalendar();
          });
        break;
      }
    }
    this._dialog.closeDialog();
  }

  get days() {
    return this.multiDayForm.controls['days'] as FormArray;
  }

  addRecurringDay() {
    if (this.days.length < 5) {
      // Add an additional day to the form array
      const dayForm = this.fb.group({
        weekday: ['', Validators.required],
      });
      this.days.push(dayForm);
      this._dialog.resize();
    } else {
      // Display snackbar popup to indicate limit reached
      const config: MatSnackBarConfig = {
        duration: 1000,
        verticalPosition: 'top',
      };
      this._snackbar.open('5 days is the limit', undefined, config);
    }
  }

  deleteRecurringDay(lessonIndex: number) {
    this.days.removeAt(lessonIndex);
    this._dialog.resize();
  }

  //* For Testing only //
  dummySubmit(form: FormGroup): void {
    form.reset();
  }

  private resetDays(): void {
    this.multiDayForm.setControl(
      'days',
      this.fb.array([this.fb.group({ weekday: ['', Validators.required] })])
    );
  }
}
