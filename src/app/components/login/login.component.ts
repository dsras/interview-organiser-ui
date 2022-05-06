import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

// [APP_LEVEL Imports]
import { BackendService } from '../../services/backend.service';
import { DataSourceService } from '../../services/data-source.service';
import { APPCONSTANTS } from '../../common/constants/app.constant';

export interface ILoginComponent {}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SocialLoginModule, SocialAuthService],
})
export class LoginComponent implements OnInit, ILoginComponent {
  socialUser: SocialUser = <any>null;
  isLoggedin: boolean = false;
  constructor(
    private router: Router,
    private _dataSourceService: DataSourceService,
    private _backEndService: BackendService,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this._dataSourceService.updateDataSource(
      APPCONSTANTS.DATA_SOURCE_CONSTANTS.ROUTE,
      'login'
    );
    this.socialAuthService.authState.subscribe((user) => {
      if (user === null) {
        localStorage.removeItem('ssoUser');
        return;
      }
      localStorage.setItem('ssoUser', JSON.stringify(user));
      if (!localStorage.getItem('userType')) {
        return;
      }
      this.socialUser = user;
      this.isLoggedin = user != null;
      if (user) {
        const loggedInObj = {
          username: user.email,
          password: user.idToken,
        };
        this.validate('social', loggedInObj);
        //this.router.navigate(['dashboard']);
      }
      // console.log("reached1");
      // console.log("info");
      // console.log("auth token: " + user.authToken);
      // console.log("auth email: " + user.email);
    });
  }
  validate(type: string, loginObj?: any): void {
    let user: any = null;
    if (loginObj) {
      user = loginObj;
    }
    user['type'] = type;
    this._dataSourceService.updateDataSource('loginType', type);
    this._backEndService.login(user).subscribe((response: any) => {
      if (response && response.token) {
        //console.log(response.token);
        localStorage.setItem('apiKey', response.token);
        this.router.navigate(['dashboard']);
      }
    });
  }
  sso(): void {
    localStorage.setItem('userType', 'social');
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
