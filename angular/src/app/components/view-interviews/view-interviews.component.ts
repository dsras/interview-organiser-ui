import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-view-interviews',
  templateUrl: './view-interviews.component.html',
  styleUrls: ['./view-interviews.component.scss']
})
export class ViewInterviewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    
  }

}
