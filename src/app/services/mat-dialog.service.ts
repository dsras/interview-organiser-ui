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

  openDialog(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template);
    this.resize();
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

  resize(): void {
    this.dialogRef?.updateSize();
  }
}
