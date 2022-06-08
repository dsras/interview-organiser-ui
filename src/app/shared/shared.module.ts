import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { getTimepickerConfig } from './functions/get-timepicker-config';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { StringToDatetimePipe } from '../pipes/string-to-datetime.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { DateToTimePipe } from '../pipes/DateToTimePipe';

@NgModule({
  imports: [
    CommonModule,
    TimepickerModule,
    BsDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    MatChipsModule,
  ],
  exports: [
    TimepickerModule,
    BsDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    StringToDatetimePipe,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    MatChipsModule,
  ],
  declarations: [
    StringToDatetimePipe,
  ],
  providers: [
    { provide: TimepickerConfig, useFactory: getTimepickerConfig },
  ],
})
export class SharedModule {}
