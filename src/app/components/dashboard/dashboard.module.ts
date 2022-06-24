import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { AllInterviewsComponent } from './all-interviews/all-interviews.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { InterviewSummaryComponent } from './interview-summary/interview-summary.component';
import { CompletedInterviewsComponent } from './completed-interviews/completed-interviews.component';
import { InterviewOverviewComponent } from './interview-overview/interview-overview.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateInterviewComponent,
    AllInterviewsComponent,
    InterviewSummaryComponent,
    CompletedInterviewsComponent,
    InterviewOverviewComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, AppRoutingModule],
  exports: [DashboardComponent, InterviewOverviewComponent, CreateInterviewComponent],
})
export class DashboardModule {}
