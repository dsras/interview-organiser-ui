import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//TODO remove mock injector service
import { MockInjectorService } from 'src/app/services/mock-injector.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //! These are only for testing, delete later
  allAvailabilityJSON !: string
  allAvailabilityOBJ !: any
  // user1Availability!: any
  // formCheck: any = ''


  constructor(
    private router: Router,
    private jsonGetter: MockInjectorService) { }

  ngOnInit(): void {
  }

  //? Probably delegate some of the functionality of determining validity to {@link interviewPossible}
  onSubmit(form: FormGroup) : void {
    let availability = this.allAvailabilityOBJ
    console.log(availability)

    //? Add better options to filter availability
    let start = form.get('start')?.value;
    let end = form.get('end')?.value;
    let firstDate = form.get('firstDate')?.value
    let lastDate = form.get('lastDate')?.value

    console.warn(`Length: ${availability.totalAvailability.length}`)
    let slots = 0;
    for (let i = 0; i < availability.totalAvailability.length; i ++) {      
      if (this.interviewPossible(start, end, firstDate, lastDate, availability.totalAvailability[i])) {
        slots += 1;
        console.log(
          `An interview is available on: ${availability.totalAvailability[i].date} with ${availability.totalAvailability[i].userId}`)
      }
      // else {
      //   console.warn(`An interview is not available on:  ${availability.totalAvailability[i].date} with `)
      // }
      
    }
    console.log(`Available interview slots ${slots}`)
  }

  // TODO replace params with DateTime instead of dates and times
  interviewPossible(
    start: Time, 
    end: Time, 
    firstDate: Date, 
    lastDate: Date, 
    availability: any
    ) : Boolean {
      if (firstDate > availability.date || availability.date > lastDate) {
        return false;
      }
      if (start >= availability.end_time || availability.start_time >= end) {
        return false;
      }
      return true;
  }

  redirect(page: string) : void {
    this.router.navigate([page]);
  }

  //! This function is only for testing, delete later
  getMockdata() {
    this.allAvailabilityJSON = this.jsonGetter.getMockData()
    this.allAvailabilityOBJ = JSON.parse(this.allAvailabilityJSON)
    // this.user1Availability = this.allAvailabilityOBJ.user1Availability 
  }

  //! This function is only for testing, delete later
  printMockData() {
    console.log("Total availability : ")
    console.log(this.allAvailabilityOBJ)
    let a = this.allAvailabilityOBJ
    console.log(a);
    
    // console.log("User 1 Availability: ")
    // console.log(this.user1Availability)
  }

}
