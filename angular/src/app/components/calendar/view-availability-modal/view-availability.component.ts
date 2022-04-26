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

    var container = document.createElement('div');

    events.forEach(appointment => {
      console.log(events.length);
      var start = appointment.start;
      var end = appointment.end;

      var outerDiv = document.createElement('div');
      outerDiv.style.display = "flex";
      outerDiv.style.flexDirection = 'row';
      
      var textArea = document.createElement('p');
      textArea.textContent += start.toLocaleString().substring(12);
      textArea.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';

      var buttonDiv = document.createElement('div');
      buttonDiv.style.paddingLeft = '10%';      

      var confirmButton = document.createElement('button');
      confirmButton.textContent = "Confirm interview";

      buttonDiv.append(confirmButton);
      outerDiv.append(textArea);
      outerDiv.append(buttonDiv);
      container.append(outerDiv);
    });

    var interviewContainer = document.createElement('div');

    interviews.forEach(appointment => {
      console.log(interviews.length);
      var start = appointment.start;
      var end = appointment.end;

      var outerDiv = document.createElement('div');
      outerDiv.style.display = "flex";
      outerDiv.style.flexDirection = 'row';
      
      var textArea = document.createElement('p');
      textArea.textContent += start.toLocaleString().substring(12);
      textArea.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';

      var buttonDiv = document.createElement('div');
      buttonDiv.style.paddingLeft = '10%';      

      var confirmButton = document.createElement('button');
      confirmButton.textContent = "Confirm interview";

      buttonDiv.append(confirmButton);
      outerDiv.append(textArea);
      outerDiv.append(buttonDiv);
      interviewContainer.append(outerDiv);
    });

    const availabilityOutput = document.getElementById("availabilityOutput");
    const interviewoutput = document.getElementById("interviewOutput");

    availabilityOutput?.append(container);
    interviewoutput?.append(interviewContainer);

  }

  static addEventRef_(events: CalendarEvent [], interviews: CalendarEvent[]){
    this.availability = events;
    this.interviews = interviews;
    const availabilityOutput = document.getElementById("availabilityOutput");
    const availabilityList = document.createElement('p');
    availabilityList.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";
    const interviewoutput = document.getElementById("interviewOutput");
    const interviewList = document.createElement('p');
    interviewList.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";
    var outerDiv = document.createElement('div');
    outerDiv.style.display = "flex";
    outerDiv.style.flexDirection = 'row';
    var confirmButton = document.createElement('button');
    var buttonDiv = document.createElement('div');
    buttonDiv.style.paddingLeft = '10%';
    confirmButton.textContent = "Confirm interview";

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
    outerDiv.append(availabilityList);
    buttonDiv.append(confirmButton);
    outerDiv.append(buttonDiv);
    availabilityOutput?.append(outerDiv);
    interviewoutput?.append(interviewList);
  }

//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}