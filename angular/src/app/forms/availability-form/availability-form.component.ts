import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

@Component({
  selector: 'app-availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss']
})
export class AvailabilityFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  open(page: string) : void {
    
  }

}
