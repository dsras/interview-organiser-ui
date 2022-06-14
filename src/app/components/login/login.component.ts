import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  SocialLoginModule,
} from 'angularx-social-login';
import { LoginService } from 'src/app/services/login/login.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import {
  getUsername,
  getUserRoleNames,
} from 'src/app/shared/functions/get-user-from-local.function';
import { LoggedInObject, LoginUser } from 'src/app/shared/models/user-model';

// [APP_LEVEL Imports]
import { DataSourceService } from '../../services/data-source.service';
import { APPCONSTANTS } from '../../shared/constants/app.constant';

/** Login component shown to all user not logged in */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SocialLoginModule, SocialAuthService],
})
export class LoginComponent implements OnInit {
  /** User */
  socialUser: SocialUser = <any>null;
  /** Tracks whether the user is logged in */
  isLoggedin: boolean = false;

  /** @ignore */
  constructor(
    private _router: Router,
    private _rs: RequestCenterService,
    private _dataSourceService: DataSourceService,
    private _socialAuthService: SocialAuthService,
    private _login: LoginService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this._dataSourceService.updateDataSource(
      APPCONSTANTS.DATA_SOURCE_CONSTANTS.ROUTE,
      'login'
    );
    this._socialAuthService.authState.subscribe((user) => {
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
        const loggedInObj: LoggedInObject = {
          username: user.email,
          password: user.idToken,
        };
        this.validate('social', loggedInObj);
      }
    });
  }

  /**
   * Validate user sign in details for use when subscribed to authState of SocialAuthService
   */
  validate(loginType: string, loginObj?: LoggedInObject): void {
    let user: LoginUser = { username: '', password: '', type: loginType };
    if (loginObj) {
      user = loginObj;
    }
    this._dataSourceService.updateDataSource('loginType', loginType);
    this._login.login(user).subscribe((response: any) => {
      if (response && response.token) {
        localStorage.setItem('apiKey', response.token);
        this._rs.getUserData(getUsername()).subscribe((returnData: any) => {
          user = returnData;
          localStorage.setItem('userData', JSON.stringify(user));
          if (getUserRoleNames().includes('RECRUITER')) {
            this._router.navigate(['/dashboard']);
          } else {
            this._router.navigate(['/calendar']);
          }
        });
      }
    });
  }

  /** Launch Google SSO */
  sso(): void {
    localStorage.setItem('userType', 'social');
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
