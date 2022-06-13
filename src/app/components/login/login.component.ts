import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  SocialLoginModule,
} from 'angularx-social-login';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { LoggedInObject, LoginUser } from 'src/app/shared/models/user-model';
import { GetUserDataService } from 'src/app/services/get-user-data.service';

// [APP_LEVEL Imports]
import { BackendService } from '../../services/backend.service';
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
    private _backEndService: BackendService,
    private _socialAuthService: SocialAuthService,
    private userService: GetUserDataService
    ) {}

  /** @ignore */
  ngOnInit(): void {
    this._dataSourceService.updateDataSource(
      APPCONSTANTS.DATA_SOURCE_CONSTANTS.ROUTE,
      'login'
    );
    console.log('pre-sub');
    this._socialAuthService.authState.subscribe((user) => {
      console.log('post-sub');

      if (user === null) {
        localStorage.removeItem('ssoUser');
        console.log('localstorage remove and close');
        return;
      }
      localStorage.setItem('ssoUser', JSON.stringify(user));
      if (!localStorage.getItem('userType')) {
        console.log('localstorage get usertype and return');
        return;
      }
      console.log('MidTest');
      this.socialUser = user;
      this.isLoggedin = user != null;
      if (user) {
        console.log('made it to validate');

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
    this._backEndService.login(user).subscribe((response: any) => {
      if (response && response.token) {
        localStorage.setItem('apiKey', response.token);
        this._rs.getUserData(this.userService.getUsername()).subscribe((returnData: any) => {
          user = returnData;
          localStorage.setItem('userData', JSON.stringify(user));
          if (this.userService.getUserRoleNames().includes('RECRUITER')){
            this._router.navigate(['/dashboard'])
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
