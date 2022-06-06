import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;

  constructor(private dailogService: MatDialog) {}

  openDialog(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template, mediumDialog);
  }

  openDialogLarge(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template, largeDialog);
  }

  openDialogSmall(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template, smallDialog);
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }
}
interface DialogConfig {
  height: string;
  width: string;
}
const smallDialog: DialogConfig = { height: '60%%', width: '40%' };
const mediumDialog: DialogConfig = { height: '75%', width: '40%' };
const largeDialog: DialogConfig = { height: '80%', width: '80%' };
