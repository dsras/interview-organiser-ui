import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';

/**
 * Navbar component displayed at the head of every page for navigation
 */
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../../styles.scss'],
})
export class NavbarComponent implements OnInit {
  //   isHeader: boolean = true;
  //   selectedMenu: string = '';
  /** Login type */
  loginType: string = '';
  /** User */
  user: any = null;

  /** @ignore */
  constructor(
    private _dataSourceService: DataSourceService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this._dataSourceService
      .getDataSource('route')
      .subscribe((value: string) => {
        // this.selectedMenu = value;
        // if (value === 'login') {
        //   this.isHeader = false;
        // } else {
        //   this.isHeader = true;
        // }
        const user = localStorage.getItem('ssoUser');
        if (user) {
          this.user = JSON.parse(user);
        }
      });
    this._dataSourceService
      .getDataSource('loginType')
      .subscribe((value: string) => {
        if (value) {
          this.loginType = value;
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

  /**
   * Gets the current navigation state of the app
   * 
   * @returns {boolean} True if currently on '/login', otherwise false.
   */
  onLoginPage(): boolean {
    if (this.router.url === '/login') {
      return true;
    }
    return false;
  }

  /**
   * Gets the logged in status of the user
   * 
   * @returns {boolean} True if the user is logged in
   */
  loggedIn(): boolean {
    return this.user != null;
  }
  click(message: string): void {
    console.log(message)
  }
}
