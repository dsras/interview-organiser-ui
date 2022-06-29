import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() userRoles: string[] = [];
  isUser: boolean = false;
  isRecruiter: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.isUser = this.userRoles.includes('USER');
    this.isRecruiter = this.userRoles.includes('RECRUITER');
    //console.log(changes)
  }

  constructor() {}

  ngOnInit(): void {}
}
