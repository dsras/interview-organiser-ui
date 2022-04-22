import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interview } from '../../requester/requestBodyTypes/types';


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
  static availability: CalendarEvent [];
  static interviews: CalendarEvent [];

  constructor(
    private ms: BsModalService
    ) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  static addEventRef(events: CalendarEvent [], interviews: CalendarEvent[]){
    this.availability = events;
    this.interviews = interviews;
    const out1 = document.getElementById("availabilityOutput");
    const text1 = document.createElement('p');
    text1.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";
    const out2 = document.getElementById("interviewOutput");
    const text2 = document.createElement('p');
    text2.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";

    events.forEach(appointment => {
      console.log(events.length);
      var start = appointment.start;
      var end = appointment.end;
      text1.textContent += start.toLocaleString().substring(12);
      text1.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    });

    
    interviews.forEach(appointment => {
      console.log(interviews.length);
      var start = appointment.start;
      var end = appointment.end;
      text2.textContent += start.toLocaleString().substring(12);
      text2.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    });
    out1?.append(text1);
    out2?.append(text2);
  }

//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}