import { Injectable, OnInit } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { userData } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad, OnInit {
  allowedRoles: Set<string> = new Set<string>(['ROLE_RECRUITER', 'ROLE_ADMIN']);
  user!: userData;
  email!: string;

  constructor(private _requester: RequestCenterService) {}

  ngOnInit(): void {
    // this.email = JSON.parse(localStorage.getItem('ssoUser')+'').email
    // this._requester.getUserRole(email)
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.allowedRoles.has(this.user$.)) {
      return true;
    // } else {
    //   return false;
    // }
  }
}
