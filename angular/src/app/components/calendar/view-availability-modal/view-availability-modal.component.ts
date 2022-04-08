import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalendarEvent } from 'angular-calendar';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { AvailabilityFormComponent } from '../../forms/availability-form/availability-form.component';


@Component({
  selector: 'view-availability-modal',
  templateUrl: './view-availability-modal.component.html',
  styleUrls: ['./view-availability-modal.component.scss']
})
export class ViewAvailabilityModalComponent implements OnInit {


  ngOnInit(): void {
  }
  // validatingForm: FormGroup;
  action = new Subject<any>();
  static events: CalendarEvent [];

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    ) {
  }


  static addEventRef(events: CalendarEvent []){
    ViewAvailabilityModalComponent.events = events;
    const out = document.getElementById("output");
    const text = document.createElement('p');
    text.textContent += ViewAvailabilityModalComponent.events[0].start.toLocaleString().substring(0,10) + "\n";

    events.forEach(appointment => {
      console.log(events.length);
      var start = appointment.start;
      var end = appointment.end;
      text.textContent += start.toLocaleString().substring(12);
      text.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    });
    out?.append(text);


  }


  reflectEvent(){

  }

  // get loginFormModalEmail() {
  //   return this.validatingForm.get('loginFormModalEmail');
  // }

  // get loginFormModalPassword() {
  //   return this.validatingForm.get('loginFormModalPassword');
  // }

  onYesClick() {
    this.action.next('yes');
  }

  onNoClick() {
    this.action.next('No');
  } 

  yell(): void {
    
    console.log(ViewAvailabilityModalComponent.events[0]);
  }

  addAvailability(): void {
    this.modalRef = this.modalService.show(AvailabilityFormComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: 'bottom',
      animated: true
    });
    this.modalRef.content.action.subscribe((result: any) => { console.log(result); });

  }

  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}