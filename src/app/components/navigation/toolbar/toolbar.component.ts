import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { ISSOUser } from 'src/app/shared/models/user-model';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  /** Login type */
  loginType: string = '';
  user: ISSOUser | null = null;
  loggedIn: boolean = false;

  /** @ignore */
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setRoute(event);
      }
    });
  }

  /** Logs out the user */
  logout(): void {
    if (this.loginType === APPCONSTANTS.LOGIN_CONSTANTS.LOGIN_TYPE_SSO) {
      this.socialAuthService.signOut();
    }
    localStorage.clear();
    this.user = null;
    this.router.navigate(['login']);
  }

  private setRoute(currentRoute: NavigationEnd): void {
    if (currentRoute.url !== '/login') {
      this.loggedIn = true;
      const user = localStorage.getItem('ssoUser');
      if (user) {
        this.user = JSON.parse(user);
        console.log(this.user);
      }
    } else {
      this.loggedIn = false;
      this.user = null;
    }
  }
}
