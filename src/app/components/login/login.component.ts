import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  SocialLoginModule,
} from 'angularx-social-login';
import { GetUserDataService } from '../../services/get-user-data.service';
import { LoginService } from '../../services/login/login.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { LoggedInObject, LoginUser } from 'src/app/shared/models/user-model';

// [APP_LEVEL Imports]
import { DataSourceService } from '../../services/data-source.service';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { Subject, takeUntil } from 'rxjs';

/** Login component shown to all user not logged in */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SocialLoginModule, SocialAuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  /** User */
  socialUser: SocialUser = <any>null;
  /** Tracks whether the user is logged in */
  isLoggedin: boolean = false;

  destroy$: Subject<boolean> = new Subject();

  /** @ignore */
  constructor(
    private _router: Router,
    private _rs: RequestCenterService,
    private _dataSourceService: DataSourceService,
    private _socialAuthService: SocialAuthService,
    private _login: LoginService,
    private _user: GetUserDataService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    //console.log('init');
    this._dataSourceService.updateDataSource(
      APPCONSTANTS.DATA_SOURCE_CONSTANTS.ROUTE,
      'login'
    );
    //console.log('init2');
    this._socialAuthService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user === null) {
          //console.log("user null");
          localStorage.removeItem('ssoUser');
          return;
        }
        //console.log(user);
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
      //console.log("init3");
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Validate user sign in details for use when subscribed to authState of SocialAuthService
   */
  validate(loginType: string, loginObj?: LoggedInObject): void {
    //console.log("validate ");
    //console.log(loginObj);
    let user: LoginUser = { username: '', password: '', type: loginType };
    if (loginObj) {
      user = loginObj;
    }
    this._dataSourceService.updateDataSource('loginType', loginType);
    this._login
      .login(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.token) {
          localStorage.setItem('apiKey', response.token);
          //console.log("key set");
          this._rs
            .getUserData(this._user.getUsername())
            .pipe(takeUntil(this.destroy$))
            .subscribe((returnData: any) => {
              user = returnData;
              localStorage.setItem('userData', JSON.stringify(user));

              this._router.navigate(['/calendar']);
            });
        }
      });
  }

  /** Launch Google SSO */
  sso(): void {
    //console.log("sso sign in ");
    localStorage.setItem('userType', 'social');
    
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(err => {
      alert("Sign in was not possible, make sure you are signed into your google account with the right company domain");
    });


  }
}
