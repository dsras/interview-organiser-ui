
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MDBModalRef } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit{
  // validatingForm: FormGroup;

  constructor(public modalRef: MDBModalRef) {
    // this.validatingForm = new FormGroup({
    //   loginFormModalEmail: new FormControl('', Validators.email),
    //   loginFormModalPassword: new FormControl('', Validators.required)
    // });
  }

  ngOnInit(): void {
  }

  // get loginFormModalEmail() {
  //   return this.validatingForm.get('loginFormModalEmail');
  // }

  // get loginFormModalPassword() {
  //   return this.validatingForm.get('loginFormModalPassword');
  // }
}