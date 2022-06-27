import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { ISSOUser } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Login type */
  loginType: string = '';
  user: ISSOUser | null = null;
  userRoles: string[] = [];
  loggedIn: boolean = false;
  url: string = '';
  currentUser = '';
  isRec = false;
  isUser= false;
  /** @ignore */
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private userDataService: GetUserDataService,
    private requester: RequestCenterService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setRoute(event);
        console.log(event);
        console.log(this.userRoles);
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
    this.userRoles = [];
    this.router.navigate(['login']);
  }

  private setRoute(currentRoute: NavigationEnd): void {
    this.url = currentRoute.urlAfterRedirects
    if (this.loggedIn && this.user && this.userRoles.length > 0) {
      return;
    } else if (currentRoute.url !== '/login') {
      this.loggedIn = true;
      const user = localStorage.getItem('ssoUser');
      const roles = this.userDataService.getUserRoleNames();
      if (user && roles !== []) {
        this.user = JSON.parse(user);
        this.currentUser = this.userDataService.getUsername();

        this.requester.getUserRoles(this.currentUser).subscribe(rolesReturn =>{
          this.userRoles = rolesReturn;
          if(this.userRoles.includes("RECRUITER")){
            this.isRec = true;
          }
          if(this.userRoles.includes('USER')){
            this.isUser = true;
          }
          console.log(this.currentUser);
          console.log(this.userRoles);
        });
        
      }
    } else {
      this.loggedIn = false;
      this.user = null;
      this.userRoles = [];
    }
  }
}
