import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public auth: LoginComponent, public router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (null === localStorage.getItem('ssoUser')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
