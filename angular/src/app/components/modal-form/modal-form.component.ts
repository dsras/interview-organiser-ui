
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





// import { Component, Input, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { CalendarEvent } from 'angular-calendar';
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
//   static events: CalendarEvent [];

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

//   static addEventRef(events: CalendarEvent []){
//     ModalFormComponent.events = events;
//     const out = document.getElementById("output");
//     const text = document.createElement('p');
//     text.textContent += ModalFormComponent.events[0].start.toLocaleString().substring(0,10) + "\n";

//     events.forEach(appointment => {
//       console.log(events.length);
//       var start = appointment.start;
//       var end = appointment.end;
//       text.textContent += start.toLocaleString().substring(12);
//       text.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
//     });
//     out?.append(text);


//   }


//   reflectEvent(){

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
    
//     console.log(ModalFormComponent.events[0]);
//   }

//   public test!: string;

//   setFormData(data: any): void {
//     this.test = data;

//   }
// }
