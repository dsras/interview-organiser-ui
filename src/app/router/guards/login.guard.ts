import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { GetUserDataService } from '../../services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    public auth: LoginComponent,
    public router: Router,
    private requester: RequestCenterService,
    private userService: GetUserDataService
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
      this.requester.getUserData(this.userService.getUsername()).subscribe((returnData: any) => {
        console.log("USer data return");
        console.log(returnData);
        localStorage.setItem('userData', returnData);
      });
      return true;
    } else {
      return true;
    }
  }
}
