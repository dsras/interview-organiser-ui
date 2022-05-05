import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInterviewsComponent } from './view-interviews/view-interviews.component';

@NgModule({
  declarations: [ViewInterviewsComponent],
  imports: [CommonModule],
  exports: [ViewInterviewsComponent],
})
export class SharedModule {}
