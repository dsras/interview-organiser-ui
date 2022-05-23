import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.scss'],
})
export class HeaderComponent implements OnInit {
//   isHeader: boolean = true;
//   selectedMenu: string = '';
  loginType: string = '';
  user: any = null;

  constructor(
    private _dataSourceService: DataSourceService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

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

  logout(): void {
    if (this.loginType === APPCONSTANTS.LOGIN_CONSTANTS.LOGIN_TYPE_SSO) {
      this.socialAuthService.signOut();
    }
    localStorage.clear();
    this.user = null;
    this.router.navigate(['login']);
  }
  onLoginPage(): boolean {
      if (this.router.url === '/login') {
          return false
      }
      return true
  }
  loggedIn(): boolean {
      return this.user != null
  }
}
