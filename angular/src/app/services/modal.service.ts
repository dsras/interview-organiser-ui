import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService
    ) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // openModal(component: any): void {
  //   this.modalRef = this.modalService.show(component, {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     ignoreBackdropClick: false,
  //     class: '',
  //     containerClass: 'bottom',
  //     animated: true
  //   });
  //   this.modalRef.content.action.subscribe((result: any) => { console.log(result); });
  // }
  
}