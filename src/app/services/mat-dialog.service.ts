import { Injectable, TemplateRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;

  constructor(private dailogService: MatDialog) {}

  openSkillform(template: TemplateRef<any>): void {
    this.openDialog(template, skillForm);
  }

  openAvailabilityForm(template: TemplateRef<any>): void {
    this.openDialog(template, availabilitySelectForm);
  }

  rangeResize(): void {
    this.resize(availabilityRangeForm);
  }

  selectResize(days?: number): void {
    let config = availabilitySelectForm;
    if (days) {
      switch (days) {
        case 0 | 1:
          this.resize(config);
          break;
        case 2:
          config.height = '82%';
          this.resize(config);
          break;
        case 3:
          config.height = '93%';
          break;
        default:
          config.height = '100%';
          this.resize(config);
          break;
      }
    } else {
      this.resize(config);
    }
  }

  openFindInterview(template: TemplateRef<any>): void {
    this.openDialog(template, findInterviewForm);
  }

  resizeFindInterview(): void {
    this.resize(findInterviewForm);
  }

  resizeCreateInterview(): void {
    this.resize(createInterviewForm);
  }

  openDayTable(template: TemplateRef<any>): void {
    this.openDialog(template, dayTable);
  }

  openStatusForm(template: TemplateRef<any>): void {
    this.openDialog(template, statusForm);
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

  private resize(config: MatDialogConfig): void {
    this.dialogRef?.updateSize(config.width, config.height);
  }

  private openDialog(
    template: TemplateRef<any>,
    config: MatDialogConfig
  ): void {
    this.dialogRef = this.dailogService.open(template, config);
  }
}

const availabilitySelectForm: MatDialogConfig = {
  height: '71%',
  width: '30%',
  position: { top: 'top' },
};
const availabilityRangeForm: MatDialogConfig = {
  height: '65%',
  width: '30%',
  position: { top: 'top' },
};
const skillForm: MatDialogConfig = { height: '55%', width: '25%' };
const findInterviewForm: MatDialogConfig = { height: '80%', width: '40%' };
const createInterviewForm: MatDialogConfig = { height: '70%', width: '40%' };
const dayTable: MatDialogConfig = { height: '80%', width: '80%' };
const statusForm: MatDialogConfig = { height: '80%', width: '80%' };
