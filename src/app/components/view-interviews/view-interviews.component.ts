import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CalendarEventInterview } from 'src/app/common/models/calendar-event-detail';

@Component({
  selector: 'app-view-interviews',
  templateUrl: './view-interviews.component.html',
  styleUrls: ['./view-interviews.component.scss'],
})
export class ViewInterviewsComponent implements OnInit {

  @Input() interviews: Array<CalendarEventInterview> = [];
  
  constructor() {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {}
}
