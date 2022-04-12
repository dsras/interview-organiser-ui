import { Injectable } from '@angular/core';
import { Component } from 'ag-grid-community';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    // public modalRef: MDBModalRef,
    // private modalService: MDBModalService,
    ) {
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