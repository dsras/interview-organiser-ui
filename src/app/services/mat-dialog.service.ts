import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;

  constructor(private dailogService: MatDialog) {}

  openDialog(template: TemplateRef<any>, config: DialogConfig): void {
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
    this.openDialog(template, availabilitySelectForm)
  }

  private resize(config: DialogConfig): void {
    this.dialogRef?.updateSize(config.width, config.height)
  }

  rangeResize(): void {
    this.resize(availabilityRangeForm)
  }

  selectResize(): void {
    this.resize(availabilitySelectForm)
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }
}
interface DialogConfig {
  height: string;
  width: string;
}
const availabilitySelectForm: DialogConfig = {height: '80%', width: '35%'}
const availabilityRangeForm: DialogConfig = { height: '70%', width: '35%' };
const skillForm: DialogConfig = { height: '55%', width: '25%' };
const smallDialog: DialogConfig = { height: '60%%', width: '40%' };
const mediumDialog: DialogConfig = { height: '75%', width: '40%' };
const tallDialog: DialogConfig = { height: '90%', width: '60%' };
const largeDialog: DialogConfig = { height: '80%', width: '80%' };
