import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
 
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'modal-test',
  templateUrl: './modal-test.component.html'
})
export class ModalTestComponent {

  modalRef?: BsModalRef;

  createInterviewForm: FormGroup = this.fb.group({
    start: [''],
    end: [''],
    firstDate: [''],
    lastDate: ['']
    //? add additional params
  })

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder
    ) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(f: FormGroup) {
    this.createInterviewForm.setValue(f.value)
    console.log("create interview form")
    console.log(this.createInterviewForm.value)
    console.warn(this.createInterviewForm.get('firstDate')?.value)
    this.formSubmitted.emit(f);
  }






}
 
/* This is a component which we pass in modal*/
 
// @Component({
//   // eslint-disable-next-line @angular-eslint/component-selector
//   selector: 'modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title pull-left">{{title}}</h4>
//       <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
//         <span aria-hidden="true" class="visually-hidden">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <ul *ngIf="list.length">
//         <li *ngFor="let item of list">{{item}}</li>
//       </ul>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
//     </div>
//   `
// })
 
// export class ModalContentComponent implements OnInit {
//   title?: string;
//   closeBtnName?: string;
//   list: any[] = [];
 
//   constructor(public bsModalRef: BsModalRef) {}
 
//   ngOnInit() {
//     this.list.push('PROFIT!!!');
//   }
// }