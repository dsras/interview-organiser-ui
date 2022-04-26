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
  static availability: CalendarEvent [] = [];
  static interviews: CalendarEvent[] = [];

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
    const availabilityOutput = document.getElementById("availabilityOutput");
    const availabilityList = document.createElement('p');
    availabilityList.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";
    const interviewoutput = document.getElementById("interviewOutput");
    const interviewList = document.createElement('p');
    interviewList.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";

    events.forEach(appointment => {
      console.log(events.length);
      var start = appointment.start;
      var end = appointment.end;
      availabilityList.textContent += start.toLocaleString().substring(12);
      availabilityList.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    });

    
    interviews.forEach(appointment => {
      console.log(interviews.length);
      var start = appointment.start;
      var end = appointment.end;
      interviewList.textContent += start.toLocaleString().substring(12);
      interviewList.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    });
    availabilityOutput?.append(availabilityList);
    interviewoutput?.append(interviewList);
  }

//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}