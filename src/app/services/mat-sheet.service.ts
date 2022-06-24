import { Injectable, TemplateRef } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class MatSheetService {
  sheetRef?: MatBottomSheetRef<TemplateRef<any>>;

  constructor(private sheet: MatBottomSheet) {}

  openSheet(template: TemplateRef<any>): void {
    this.sheetRef = this.sheet.open(template);
  }
}
