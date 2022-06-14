import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { getUsername } from 'src/app/shared/functions/get-user-from-local.function';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    public auth: LoginComponent,
    public router: Router,
    private requester: RequestCenterService
  ) {}

  canActivate(): boolean {
    if (
      null === localStorage.getItem('ssoUser') ||
      localStorage.getItem('ssoUser') === ''
    ) {
      localStorage.clear()
      this.router.navigate(['login']);
      return false;
    } else if (
      null === localStorage.getItem('userData') ||
      localStorage.getItem('userData') === ''
    ) {
      this.requester.getUserData(getUsername()).subscribe((returnData: any) => {
        localStorage.setItem('userData', JSON.stringify(returnData));
      });
      return true;
    } else {
      return true;
    }
  }
}
