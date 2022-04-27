import { Component, OnInit, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';


@Component({
  selector: 'view-availability',
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.scss']
})
export class ViewAvailabilityComponent implements OnInit {

  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() availability: CalendarEvent[] = []
  @Input() interviews: CalendarEvent[] = []


  ngOnInit(): void {
  }
  action = new Subject<any>();

  constructor( ) {
  }


//? What does this do @Sulkyoptimism?
  public test!: string;

  setFormData(data: any): void {
    this.test = data;

  }
}