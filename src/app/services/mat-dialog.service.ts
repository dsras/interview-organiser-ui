import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;

  constructor(private dailogService: MatDialog) {}

  openDialog(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template);
  }

  openDialogLarge(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template, largeDialog);
  }

  openDialogSmall(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template, smallDialog)
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }
}
interface DialogConfig {
  height: string;
  width: string;
}
const smallDialog: DialogConfig = {
  height: '400px',
  width: '600px',
};
const largeDialog: DialogConfig = {
  height: '80%',
  width: '80%',
};
