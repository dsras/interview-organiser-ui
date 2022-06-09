import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  dateRangeForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    firstDate: ['', Validators.required],
    lastDate: ['', Validators.required],
  });

  multiDayForm: FormGroup = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    recurringDays: this.fb.array(
      [
        this.fb.group({ weekday: ['', Validators.required] }),
      ],
      Validators.minLength(1)
    ),
    occurences: ['1', [Validators.required, Validators.min(1)]],
  });

  formSelector: FormGroup = this.fb.group({ range: [true] });

  isChecked: boolean = false;

  weekendFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogService,
    private aRequester: AvailabilityRequesterService
  ) {}

  /** @ignore */
  ngOnInit(): void {}

  /** @ignore */
  openDialog(template: TemplateRef<any>): void {
    this._dialog.openDialogTall(template);
  }

  /** @ignore */
  closeDialog(): void {
    this._dialog.closeDialog();
  }

  /**
   * Accepts a completed form populated by user to be sent to database
   *
   * @param {FormGroup} form completed FormGroup to be submitted
   */
  onSubmit(form: FormGroup): void {
    this.aRequester.addAvailabilityForm(form.value);
    form.reset();
  }

  get recurringDays() {
    return this.multiDayForm.controls['recurringDays'] as FormArray;
  }

  addRecurringDay() {
    const dayForm = this.fb.group({
      weekday: ['', Validators.required],
    });

    this.recurringDays.push(dayForm);
  }

  deleteRecurringDay(lessonIndex: number) {
    this.recurringDays.removeAt(lessonIndex);
  }

  dummySubmit(form: FormGroup): void {
    console.log(form.value);
    form.reset();
  }

  test() {
    console.log(this.isChecked);
  }
}
