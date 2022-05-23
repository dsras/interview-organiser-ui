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
  ],
  declarations: [StringToDatetimePipe],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class SharedModule {}
