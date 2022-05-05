import { Component, OnInit, TemplateRef } from '@angular/core';
import { interview } from 'src/app/common/models/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { InterviewRequesterService } from 'src/app/services/requester/interview-requester.service';
@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss']
})
export class AllInterviewsComponent implements OnInit {

  //todo type any to appropriate type
  interviews: Array<interview> = [];

  constructor(
    private ms: ModalControllerService,
    private iRequester: InterviewRequesterService
  ) { }

  ngOnInit(): void {
    this.iRequester.getInterviewsDashboard(this.interviews);
  }

  print(obj: any): void {
    console.log(JSON.stringify(obj))
  }

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template)
  }

  closeModal(): void {
    this.ms.closeModal()
  }

}
