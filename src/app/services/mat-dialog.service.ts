import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;

  constructor(private dailogService: MatDialog) {}

  openDialog(template: TemplateRef<any>, config: MatDialogConfig): void {
    this.dialogRef = this.dailogService.open(template, config);
  }

  openDialogTall(template: TemplateRef<any>): void {
    this.openDialog(template, tallDialog);
  }

  openDialogLarge(template: TemplateRef<any>): void {
    this.openDialog(template, largeDialog);
  }

  openDialogSmall(template: TemplateRef<any>): void {
    this.openDialog(template, smallDialog);
  }

  openSkillform(template: TemplateRef<any>): void {
    this.openDialog(template, skillForm);
  }

  openAvailabilityForm(template: TemplateRef<any>): void {
    this.openDialog(template, availabilitySelectForm);
  }

  private resize(config: MatDialogConfig): void {
    this.dialogRef?.updateSize(config.width, config.height);
  }

  rangeResize(): void {
    this.resize(availabilityRangeForm)
  }

  selectResize(days?: number): void {
    let config = availabilitySelectForm
    if (days) {
      switch (days) {
        case 0 | 1:
          this.resize(config)
          break
        case 2:
          config.height = '82%'
          this.resize(config)
          break
        case 3:
          config.height = '93%'
          break
        default:
          config.height = '100%'
          this.resize(config)
          break
      }
    } else {
      this.resize(config);
    }  }

  closeDialog(): void {
    this.dialogRef?.close();
  }
}

const availabilitySelectForm: MatDialogConfig = { height: '71%', width: '30%', position: {top: 'top'} };
const availabilityRangeForm: MatDialogConfig = { height: '65%', width: '30%', position: {top: 'top'} };
const skillForm: MatDialogConfig = { height: '55%', width: '25%' };
const smallDialog: MatDialogConfig = { height: '60%%', width: '40%' };
const mediumDialog: MatDialogConfig = { height: '75%', width: '40%' };
const tallDialog: MatDialogConfig = { height: '90%', width: '60%' };
const largeDialog: MatDialogConfig = { height: '80%', width: '80%' };

