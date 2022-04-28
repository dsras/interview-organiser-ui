import { Component, OnInit, TemplateRef } from '@angular/core';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { interview } from 'src/app/constants/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss']
})
export class AllInterviewsComponent implements OnInit {

  //todo type any to appropriate type
  interviews: Array<interview> = [];

  constructor(
    private rs: RequestCenterService,
    private ms: ModalControllerService,
  ) { }

  ngOnInit(): void {
    this.rs.getInterviewsDashboard(this.interviews);
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
