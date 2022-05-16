import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public auth: LoginComponent, public router: Router) {}

  canActivate(): boolean {
    if (null === localStorage.getItem('ssoUser')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
