import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockInjectorService } from 'src/app/services/mock-injector.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allAvailabilityJSON !: string
  allAvailabilityOBJ !: any
  user1Availability!: any

  constructor(
    private router: Router,
    private jsonGetter: MockInjectorService) { }

  ngOnInit(): void {
  }

  redirect(page: string) : void {
    this.router.navigate([page]);
  }

  getMockdata() {
    this.allAvailabilityJSON = this.jsonGetter.getMockData()
    this.allAvailabilityOBJ = JSON.parse(this.allAvailabilityJSON)
    this.user1Availability = this.allAvailabilityOBJ.user1Availability 
  }

  printMockData() {
    console.log("Total availability : ")
    console.log(this.allAvailabilityOBJ)
    console.log("User 1 Availability: ")
    console.log(this.user1Availability)
  }

}
