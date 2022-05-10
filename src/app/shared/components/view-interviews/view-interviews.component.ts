import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CalendarEventInterview } from '../../models/calendar-event-detail';
import { ModalControllerService } from 'src/app/services/modal-controller.service';

@Component({
  selector: 'view-interviews',
  templateUrl: './view-interviews.component.html',
  styleUrls: ['./view-interviews.component.scss'],
})
export class ViewInterviewsComponent implements OnInit {

  @Input() interviews: Array<CalendarEventInterview> = [];
  
  constructor(
    private ms: ModalControllerService
  ) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.ms.openModalLg(template)
  }
}
