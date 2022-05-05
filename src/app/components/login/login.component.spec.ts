import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing' 
import { LoginComponent } from './login.component';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig } from 'angularx-social-login';
import { APPCONSTANTS, prodEnv } from '../../common/constants/app.constant';

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,

      ],
      providers: [
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
      }
        // GoogleLoginProvider,
        // SocialUser
      ],
      declarations: [ 
        LoginComponent
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
