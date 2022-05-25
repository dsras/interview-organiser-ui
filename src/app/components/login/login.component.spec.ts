import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing' 
import { LoginComponent } from './login.component';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig } from 'angularx-social-login';
import { APPCONSTANTS, prodEnv } from '../../shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';
import { BackendService } from 'src/app/services/backend.service';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DataSource } from 'src/app/shared/models/data-service';
import { Router } from '@angular/router';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

const FakeBackendService = {
  login(input:string){
    return of({
      token: "this is a token",
    })
  }
}
const FakeDataSource = {
  _dataSource: <any> new Object,

  getDataSource(source: string): Observable<any> {
    this._dataSource[source] = <Observable<any>><unknown>'login';
    return of(this._dataSource[source]);
  },
  createDataSource(): void {
    this._dataSource = new DataSource();
  },
  updateDataSource(source: string, value: any): void {
    if (this._dataSource && this._dataSource[source]) {
      if (this._dataSource[source] !== value) {
        this._dataSource[source].next(value);
      }
    }
  }
}
const fakeSocialAuth = {
  _authState: of(new SocialUser),
  get authState(): Observable<SocialUser>{
    return of(new SocialUser);
  },
  signIn(providerId: string){
    return of(new SocialUser);
  }

}

const fakeRouter = {
  navigate(input: Array<any>){
    return <Promise<void>>input[0];
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let bService: BackendService;
  let dService: DataSourceService;
  let sService: SocialAuthService;
  let googleUser: any;
  let router: Router;
  let rcService: RequestCenterService;

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
        {provide: BackendService, useValue: FakeBackendService},
        {provide: DataSourceService, useValue: FakeDataSource},
        {provide: Router, useValue: fakeRouter},
        {provide: SocialAuthService, useValue: fakeSocialAuth},
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
    router = TestBed.inject(Router);
    rcService = TestBed.inject(RequestCenterService);
    bService = TestBed.inject(BackendService);
    dService = TestBed.inject(DataSourceService);
    sService = TestBed.inject(SocialAuthService);
    googleUser = GoogleLoginProvider.PROVIDER_ID;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //! not sure how to proceed with this one
  it('ngOnInit calls various service methods', fakeAsync(() => {
    dService.createDataSource();
    tick(3);
    let dSpy = spyOn(dService, "updateDataSource").and.callThrough();
    let cSpy = spyOn(component, "validate").and.callThrough();
    // sService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // let aSpy = spyOn(sService, 'authState').and.callFake(() =>of(new SocialUser));
    let aSpy = spyOnProperty(sService, 'authState', 'get').and.returnValue(of(new SocialUser));
    component.ngOnInit();
    tick(3);
    expect(dSpy).toHaveBeenCalled();
    expect(cSpy).toHaveBeenCalled();
  }));


  it('validate should call service methods', () => {
    let dSpy = spyOn(dService, 'updateDataSource').and.callThrough();
    let bSpy = spyOn(bService, 'login').and.callThrough();
    let rSpy = spyOn(router, 'navigate').and.callThrough();
    let rcSpy = spyOn(rcService, 'getUserData').and.callThrough();
    localStorage.setItem('ssoUser', JSON.stringify({
      email: 'thorfinn.manson@accolitedigital.com'
    }));
    let dummyStringInput = "Social";
    component.validate(dummyStringInput, {type:"type"});
    expect(dSpy).toHaveBeenCalled();
    expect(bSpy).toHaveBeenCalled();
    expect(localStorage.getItem('apiKey') == 'this is a token').toBeTruthy();
    expect(rcSpy).toHaveBeenCalled();
    expect(rSpy).toHaveBeenCalled();
    
  });

  //! still trying to get the signIn function to call
  it('SSO should call service methods', fakeAsync(() => {
    let sSpy = spyOn(sService, 'signIn').and.returnValue(new Promise<SocialUser>((resolve, reject) => {
      resolve(new SocialUser());
    }));  
    tick(3)  ;
    component.sso();
    tick(3);
    expect(sSpy).toHaveBeenCalled();
  }));
});
