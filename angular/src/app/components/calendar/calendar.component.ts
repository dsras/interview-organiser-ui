import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvailabilityFormComponent } from 'src/app/forms/availability-form/availability-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(page: string) : void {
    this.router.navigate([page]);
  }

  

}
