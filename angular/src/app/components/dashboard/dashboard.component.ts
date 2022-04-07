import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MockInjectorService } from 'src/app/services/mock-injector.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //! These are only for testing, delete later
  allAvailabilityJSON !: string
  allAvailabilityOBJ !: any
  user1Availability!: any
  formCheck: any = ''
  

  constructor(
    private router: Router,
    private jsonGetter: MockInjectorService) { }

  ngOnInit(): void {
  }

  //? Probably delegate some of the functionality of determining validity to {@link interviewPossible}
  onSubmit(form: FormGroup) : void {
    console.log("submitted")
    let availability = this.user1Availability
    console.log(availability)
    // TODO Add better options to filter availability
    // let start = form.controls['start'].value;
    // let end = form.controls['end'].value;
    let date = form.get('date')?.value
    console.log(date)
    //form.get('date')?.value

    for (let i = 0; i < availability.length; i ++){
      console.warn(i)
      if (this.interviewPossible() && date == availability[i].date) {
        console.log(`An interview is available on: ${date}`)
      }
    }
    
    
  }

  // TODO create ogic to test whether interviews can be found for certain search criteria
  interviewPossible(
    //? Potential params here => intStart: Date, intEnd: Date, availStart: Date, availEnd: Date
    ) : Boolean {
    return true;
  }

  redirect(page: string) : void {
    this.router.navigate([page]);
  }
  //! This function is only for testing, delete later
  getMockdata() {
    this.allAvailabilityJSON = this.jsonGetter.getMockData()
    this.allAvailabilityOBJ = JSON.parse(this.allAvailabilityJSON)
    this.user1Availability = this.allAvailabilityOBJ.user1Availability 
  }
  //! This function is only for testing, delete later
  printMockData() {
    console.log("Total availability : ")
    console.log(this.allAvailabilityOBJ)
    console.log("User 1 Availability: ")
    console.log(this.user1Availability)
  }

}
