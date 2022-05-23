import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/components/login/login.component';
import { prodEnv, APPCONSTANTS } from 'src/app/shared/constants/app.constant';

import { LoginGuard } from './login.guard';

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

const fakeRouter = {
  navigate(input: Array<any>){
    return <Promise<void>>input[0];
  }
}
describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
      ],
      providers: [
        {provide: Router, useValue: fakeRouter},
        SocialAuthService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(CLIENT_ID)
                      //provider: new GoogleLoginProvider('61469011957-etn1feijdcp2ap3af8sh6ri9pkf9v444.apps.googleusercontent.com')
                          
                  }
              ]
          } as SocialAuthServiceConfig,
        },
        LoginComponent,
        BsModalService,
        DatePipe,
        FormBuilder, 
        LoginComponent,             
      ],
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('can activate calls through', () => {
    let rSpy = spyOn(router, 'navigate').and.callThrough();
    localStorage.clear();
    guard.canActivate();
    expect(rSpy).toHaveBeenCalledTimes(1);

    localStorage.setItem('ssoUser', 'valid');
    guard.canActivate();
    expect(rSpy).toHaveBeenCalledTimes(1);

    localStorage.clear();
  });
});
