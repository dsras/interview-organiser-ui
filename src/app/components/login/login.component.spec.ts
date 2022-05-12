import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing' 
import { LoginComponent } from './login.component';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig } from 'angularx-social-login';
import { APPCONSTANTS, prodEnv } from '../../shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';
import { BackendService } from 'src/app/services/backend.service';

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let bService: BackendService;
  let dService: DataSourceService;
  let sService: SocialAuthService;
  let localStore: any;
  let googleUser: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,

      ],
      providers: [
        DataSourceService,
        BackendService,
        SocialAuthService,
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
    bService = TestBed.inject(BackendService);
    dService = TestBed.inject(DataSourceService);
    sService = TestBed.inject(SocialAuthService);
    googleUser = GoogleLoginProvider.PROVIDER_ID;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate should call service methods', () => {
    let dSpy = spyOn(dService, 'updateDataSource').and.callThrough();
    let bSpy = spyOn(bService, 'login').and.callThrough();
    let dummyStringInput = "Social";
    component.validate(dummyStringInput);
    expect(dService.updateDataSource).toHaveBeenCalled();
    expect(bService.login).toHaveBeenCalled();
  });

  //! still trying to get the signIn function to call
  // it('SSO should call service methods', fakeAsync(() => {
  //   let sSpy = spyOn(sService, 'signIn').and.returnValue(Promise.resolve(googleUser));    
  //   let lSpy = spyOn(localStorage, "setItem")
  //   tick(3);
  //   component.sso();
  //   expect(localStorage.setItem).toHaveBeenCalled();
  //   expect(sService.signIn).toHaveBeenCalled();
  // }));
});
