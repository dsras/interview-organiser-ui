import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FindInterviewComponent } from './find-interview/find-interview.component';
import { AllInterviewsComponent } from './all-interviews/all-interviews.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { MatTableModule } from '@angular/material/table'



@NgModule({
  declarations: [
    DashboardComponent,
    FindInterviewComponent,
    AllInterviewsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTableModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
