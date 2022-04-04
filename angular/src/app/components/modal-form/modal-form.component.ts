
// import { Component, Input, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { MDBModalRef } from 'ng-uikit-pro-standard';
// import { Subject } from 'rxjs';


// @Component({
//   selector: 'app-modal-form',
//   templateUrl: './modal-form.component.html',
//   styleUrls: ['./modal-form.component.scss']
// })
// export class ModalFormComponent implements OnInit{
//   // validatingForm: FormGroup;
//   action = new Subject<any>();

//   constructor(
//     public modalRef: MDBModalRef,
//     ) {
//     // this.validatingForm = new FormGroup({
//     //   loginFormModalEmail: new FormControl('', Validators.email),
//     //   loginFormModalPassword: new FormControl('', Validators.required)
//     // });
//   }

  

//   ngOnInit(): void {
//   }

//   // get loginFormModalEmail() {
//   //   return this.validatingForm.get('loginFormModalEmail');
//   // }

//   // get loginFormModalPassword() {
//   //   return this.validatingForm.get('loginFormModalPassword');
//   // }

//   onYesClick() {
//     this.action.next('yes');
//   }

//   onNoClick() {
//     this.action.next('No');
//   } 

//   yell(): void {
//     console.log('Yell')
//   }

//   public test!: string;

//   setFormData(data: any): void {
//     this.test = data;

//   }
// }
