import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userData } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class RecruiterGuard implements CanActivate {
  constructor(private _router: Router) {}

  private _allowedRoles: Array<string> = ['RECRUITER', 'ADMIN'];

  canActivate(): boolean {
    let allowed = false;
    const userData: userData = JSON.parse(
      '' + localStorage.getItem('userData')
    );
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
