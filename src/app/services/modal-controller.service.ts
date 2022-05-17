import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  modalRef?: BsModalRef
  dialogRef?: MatDialogRef<TemplateRef<any>>

  constructor(
    private modalService: BsModalService,
    private dailogService: MatDialog,
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  openModalLg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'})
  }

  closeModal() {
    this.modalRef?.hide()
  }

  openDialog(template: TemplateRef<any>): void {
    this.dialogRef = this.dailogService.open(template)
  }

  closeDialog(): void {
    this.dialogRef?.close()
  }

}
