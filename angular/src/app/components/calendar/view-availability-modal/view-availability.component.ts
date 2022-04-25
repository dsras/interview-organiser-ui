import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interview } from '../../requester/requestBodyTypes/types';
import { calHeadModule } from '../header/module';


@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityModalComponent implements OnInit {

  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef?: BsModalRef;
  static appointments?:string[];
  static myInterviews?:string[];

  ngOnInit(): void {
  }
  // validatingForm: FormGroup;
  action = new Subject<any>();
  availability!: CalendarEvent [];
  interviews!: CalendarEvent [];

  constructor(
    private ms: BsModalService
    ) {
  }

  openModal(template: TemplateRef<any>, ) {
    this.modalRef = this.ms.show(template);
   
  }

  get EventsRef(){
    console.log("getting event refs");
    return ViewAvailabilityModalComponent.appointments;
  }  
  get InterviewsRef(){
    return ViewAvailabilityModalComponent.myInterviews;
  }
  static addRefs(events:CalendarEvent[], interviews:CalendarEvent[]){
    events.forEach(ele=>{
      console.log(ele);
      var start = ele.start;
      var end = ele.end;
      var stringOut = start.toLocaleString().substring(12) + " -> " + end?.toLocaleString().substring(12) + '\n';
      ViewAvailabilityModalComponent.appointments?.push(stringOut);
      console.log("stringOut");
      console.log(ViewAvailabilityModalComponent.appointments?.length);
    });
    interviews.forEach(ele=>{
      console.log(ele);
      var start = ele.start;
      var end = ele.end;
      var stringOut = start.toLocaleString().substring(12) + " -> " + end?.toLocaleString().substring(12) + '\n';
      this.myInterviews?.push(stringOut);
    });
  }
  static addEventRef(events: CalendarEvent [], interviews: CalendarEvent[]){
    // this.availability = events;
    // this.interviews = interviews;
    // const out1 = document.getElementById("availabilityOutput");
    // const text1 = document.createElement('p');
    // text1.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";
    // const out2 = document.getElementById("interviewOutput");
    // const text2 = document.createElement('p');
    // text2.textContent += this.availability[0].start.toLocaleString().substring(0,10) + "\n";

    // events.forEach(appointment => {
    //   console.log(events.length);
    //   var start = appointment.start;
    //   var end = appointment.end;
    //   text1.textContent += start.toLocaleString().substring(12);
    //   text1.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    // });

    
    // interviews.forEach(appointment => {
    //   console.log(interviews.length);
    //   var start = appointment.start;
    //   var end = appointment.end;
    //   text2.textContent += start.toLocaleString().substring(12);
    //   text2.textContent += " -> " + end?.toLocaleString().substring(12) + '\n';
      
    // });

    // const div1 = document.createElement('div');
    // const div2 = document.createElement('div');
    // div1.append(text1);
    // div2.append(text2);

    // out1?.append(div1);
    // out2?.append(div2);
  }

//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}