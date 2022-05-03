import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.scss']
})
export class InterviewStatusComponent implements OnInit {

  @Input() slot?: CalendarEvent;

  statusForm: FormGroup = this.fb.group({
    status: ['']
  });

  myForm?: FormGroup;

  interviewStatusOptions: Array<string> = [];

  statusList: string[] = [
    'Completed',
    'Candidate No Show',
    'Panel No Show'
  ]

  outcomeList: string[] = [
    'Progressed',
    'Didnt Progress',
    'Hired'
  ]


  interviewerOptions: string[] = [
    this.statusList[0],
    this.statusList[1],
  ];

  recruiterOptions: string[] = [
    this.statusList[2],
    this.outcomeList[0],
    this.outcomeList[1],
    this.outcomeList[2],

  ];

  interviewStatusForm?: FormGroup;

  constructor(
    private ms: ModalControllerService,
    private rs: RequestCenterService,
    private fb: FormBuilder,
  ) { };

  ngOnInit() { };

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template)
  };

  closeModal(): void {
    this.ms.closeModal()
  };

  onSubmit(f: FormGroup): void {
    let str:string = f.value.status;
    let id: number = -1;

    if (this.slot?.id) {
      id = Number(this.slot.id)
    }

    let errCount: number=0;
    let isOutcome: boolean = true;
    for(let element of this.statusList){
      if(str === element){
        isOutcome = false;
        break;
      }
      else{
        errCount++;
      }
    }
    for(let element of this.outcomeList){
      if(str === element){
        isOutcome = true;
        break;
      }
      else{
        errCount++;
      }
    }

    if(errCount>=6 || id==-1){
      console.warn("Probably nothing selected in the status menu before submission");
      return;
    }
    this.rs.updateStatus(id, str, !isOutcome)
    f.reset();
  }

}
