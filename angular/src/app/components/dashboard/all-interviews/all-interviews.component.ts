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
  interviews = <Array<interview>>[];

  constructor(
    private rs: RequestCenterService,
    private ms: ModalControllerService,
  ) { }

  ngOnInit(): void {
    this.rs.getInterviewsDashboard(this.interviews);
    }

  print(obj: any) {
    console.log(JSON.stringify(obj))
  }

  openModal(template: TemplateRef<any>) {
    this.ms.openModal(template)
  }

  // createOL(array: any[]) {
  //   let list = document.createElement('ol');
    
  //   for (let i = 0; i < array.length; i++) {
  //     let item = document.createElement('li');
  //     item.appendChild(document.createTextNode(array[i]));
  //     list.appendChild(item);
  //   }

  //   return list

  // }

}
