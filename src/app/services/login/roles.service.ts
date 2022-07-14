import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestCenterService } from '../requester/request-center.service';
import { RoleViewService } from '../role-view.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private userRoles: string[] = [];
  private userRoles$: BehaviorSubject<string[]> = new BehaviorSubject(new Array<string>)

  constructor(
    private requester: RequestCenterService,
    private view: RoleViewService
  ) {}

  saveRoles(username: string) {
    this.requester.getUserRoles(username).subscribe((roles) => {
      this.userRoles = roles;
      this.userRoles$.next(roles)
      this.view.defaultView(roles)
    });
  }

  getRoles(): string[] {
    return this.userRoles;
  }
}
