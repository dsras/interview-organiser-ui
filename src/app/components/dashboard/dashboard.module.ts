import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FindInterviewComponent } from './find-interview/find-interview.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { AllInterviewsComponent } from './all-interviews/all-interviews.component';
import { SharedModule } from '../shared/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DashboardComponent,
    FindInterviewComponent,
    CreateInterviewComponent,
    AllInterviewsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
