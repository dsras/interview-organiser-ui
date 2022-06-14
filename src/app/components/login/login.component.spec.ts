import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing' 
import { LoginComponent } from './login.component';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig } from 'angularx-social-login';
import { APPCONSTANTS, prodEnv } from '../../shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';
import { DatePipe } from '@angular/common';
import { DataSource } from 'src/app/shared/models/data-service';
import { Router } from '@angular/router';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { IUser, LoggedInObject } from 'src/app/shared/models/user-model';
import { LoginService } from 'src/app/services/login/login.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { UserData } from 'src/app/shared/models/types';
import { Requester } from 'src/app/services/requester/requester.service';

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;
const MockRequester={
  getRequest<Type>(reqestURL: string): Observable<any> {
    return of('Get');
  },
  postRequest<Type>(reqestURL: string, obj: Type): Observable<any> {
    return of('Post');

  },
  postRequestNoType<type>(link: string, obj: any): Observable<any> {
    return of('PostNoType')
  },
  postRequestNoAuth<type>(link: string, obj: any): Observable<any> {
    return of('PostNoType')
  }
}
const user:IUser={
  username: '',
  password: ''
}
describe('LoginService', () => {
  let service: LoginService;
  let rService: Requester;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //RouterTestingModule,
        HttpClientTestingModule,

      ],
      providers: [
        //DataSourceService,
        // BackendService,
        SocialAuthService,
        DatePipe,
        RequestCenterService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(CLIENT_ID)
                          
                  }
              ]
          } as SocialAuthServiceConfig,
        }
      ]
    })
  });

  beforeEach(() => {
    service = TestBed.inject(LoginService);
    rService = TestBed.inject(Requester);
  });



  it('login should call service method', () => {
    let spy = spyOn(rService, 'postRequestNoAuth').and.callThrough();
    service.login(user);
    expect(spy).toHaveBeenCalled();
  });

});
