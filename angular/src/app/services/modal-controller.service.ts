import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  modalRef?: BsModalRef

  constructor(
    private modalService: BsModalService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  openModalLg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'})
  }

  closeModal() {
    this.modalRef?.hide()
  }}
