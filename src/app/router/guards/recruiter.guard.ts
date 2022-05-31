import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUserData } from 'src/app/shared/functions/get-user-from-local.function';
import { UserData } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class RecruiterGuard implements CanActivate {
  constructor(private _router: Router) {}

  private _allowedRoles: Array<string> = ['RECRUITER', 'ADMIN'];

  canActivate(): boolean {
    let allowed = false;
    const userData: UserData = getUserData();
    if (userData) {
      for (let i = 0; i < userData.roles.length; i++) {
        if (this._allowedRoles.includes(userData.roles[i].name)) {
          allowed = true;
        }
      }
    }
    if (!allowed) {
      this._router.navigate(['calendar']);
    }
    return allowed;
  }
}
