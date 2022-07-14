import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Subject, takeUntil } from 'rxjs';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { RoleViewService } from 'src/app/services/role-view.service';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { ISSOUser } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  /** Login type */
  loginType: string = '';
  user: ISSOUser | null = null;
  userRoles: string[] = [];
  loggedIn: boolean = false;
  url: string = '';
  currentUser = '';
  isRec = false;
  isUser = false;

  destroy$: Subject<boolean> = new Subject();

  /** @ignore */
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private userDataService: GetUserDataService,
    private requester: RequestCenterService,
    private roleView: RoleViewService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setRoute(event);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** Logs out the user */
  logout(): void {
    if (this.loginType === APPCONSTANTS.LOGIN_CONSTANTS.LOGIN_TYPE_SSO) {
      this.socialAuthService.signOut();
    }
    this.clearData();
    this.router.navigate(['login']);
  }

  viewRecruiter(): void {
    this.roleView.changeView('RECRUITER');
  }

  viewUser(): void {
    this.roleView.changeView('USER');
  }

  private clearData(): void {
    this.isRec = false;
    this.isUser = false;
    localStorage.clear();
    this.user = null;
    this.userRoles = [];
    this.loginType = '';
    this.loggedIn = false;
    this.currentUser = '';
  }

  private setRoles(returnedRoles: string[]): void {
    this.userRoles = returnedRoles;
    if (this.userRoles.includes('RECRUITER')) {
      this.isRec = true;
    }
    if (this.userRoles.includes('USER')) {
      this.isUser = true;
    }
  }

  private setRoute(currentRoute: NavigationEnd): void {
    this.url = currentRoute.urlAfterRedirects;
    if (this.loggedIn && this.user && this.userRoles.length > 0) {
      return;
    } else if (currentRoute.url !== '/login') {
      this.loggedIn = true;
      const user = localStorage.getItem('ssoUser');
      const roles = this.userDataService.getUserRoleNames();
      if (user && roles !== []) {
        this.user = JSON.parse(user);
        this.currentUser = this.userDataService.getUsername();
        this.requester
          .getUserRoles(this.currentUser)
          .pipe(takeUntil(this.destroy$))
          .subscribe((returnedRoles) => {
            this.setRoles(returnedRoles);
          });
      }
    } else {
      this.loggedIn = false;
      this.user = null;
      this.userRoles = [];
    }
  }
}
