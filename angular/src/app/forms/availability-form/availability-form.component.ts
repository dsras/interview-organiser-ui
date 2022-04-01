import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss']
})


export class AvailabilityFormComponent implements OnInit {

  public test = 'test'

  @Output() event:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendToParent(): void {
    this.event.emit(this.test)
  }

  yell(): void {
    console.log('Yell')
  }

}
