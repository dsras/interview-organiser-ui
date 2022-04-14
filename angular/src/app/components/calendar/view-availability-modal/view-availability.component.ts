import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityModalComponent implements OnInit {

  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter<boolean>();


  modalRef?: BsModalRef

  ngOnInit(): void {
  }
  // validatingForm: FormGroup;
  action = new Subject<any>();
  static events: CalendarEvent [];



  constructor(
    private ms: BsModalService
    ) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
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

  onYesClick() {
    this.action.next('yes');
  }

  closeClick() {
    this.action.next('No');
    this.modalRef?.hide();
    this.closeClicked.emit(true);
  } 

  yell(): void {
    
    console.log(ViewAvailabilityModalComponent.events[0]);
  }

  // addAvailability(): void {
  //   this.modalRef = this.modalService.show(AvailabilityFormComponent, {
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
//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}