import { Injectable, TemplateRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  dialogRef?: MatDialogRef<TemplateRef<any>>;
  private CALENDARDAYWIDTH = '60%'

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

  openDay(template: TemplateRef<any>):void {
    this.dialogRef = this.dailogService.open(template)
    this.resize()
    this.dialogRef.updateSize(this.CALENDARDAYWIDTH)
  }
  resizeDay(): void {
    this.resize()
    this.dialogRef?.updateSize(this.CALENDARDAYWIDTH)
  }

}
