import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    public auth: LoginComponent,
    public router: Router,
    private requester: RequestCenterService,
    private userService: GetUserDataService
  ) {}
  canActivate(): boolean {
    if (this.userService.getUserData()) {
      this.router.navigate(['calendar'])
      return false
    } else {
      return true
    }
    // if (
    //   null === localStorage.getItem('ssoUser') ||
    //   localStorage.getItem('ssoUser') === ''
    // ) {
    //   localStorage.clear();
    //   this.router.navigate(['login']);
    //   return false;
    // } else if (
    //   null === localStorage.getItem('userData') ||
    //   localStorage.getItem('userData') === ''
    // ) {
    //   this.requester
    //     .getUserData(this.userService.getUsername())
    //     .subscribe((returnData: any) => {
    //       console.log('User data return');
    //       console.log(returnData);
    //       localStorage.setItem('userData', returnData);
    //     });
    //   return true;
    // } else {
    //   return true;
    // }
  }
}
