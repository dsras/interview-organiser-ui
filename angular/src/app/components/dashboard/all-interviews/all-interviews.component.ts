import { Component, OnInit } from '@angular/core';
import { RequestCenterService } from '../../requester/request-center.service';

@Component({
  selector: 'all-interviews',
  templateUrl: './all-interviews.component.html',
  styleUrls: ['./all-interviews.component.scss']
})
export class AllInterviewsComponent implements OnInit {

  //todo type any to appropriate type
  interviews : any;

  constructor(
    private rs: RequestCenterService
  ) { }

  ngOnInit(): void {
    this.rs.getInterviewsDashboard(this.interviews);
    }

  print(obj: any) {
    console.log('print')
    console.warn(obj)
  }

  logInterviews() {
    console.log(this.interviews)
  }

  createOL(array: any[]) {
    let list = document.createElement('ol');
    
    for (let i = 0; i < array.length; i++) {
      let item = document.createElement('li');
      item.appendChild(document.createTextNode(array[i]));
      list.appendChild(item);
    }

    return list

  }

}
