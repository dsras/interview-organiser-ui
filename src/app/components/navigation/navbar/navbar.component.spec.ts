import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of, Observable } from 'rxjs';
import { prodEnv, APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { DataSource } from 'src/app/shared/models/data-service';

const FakeDataSource = {
  _dataSource: <any>new Object(),

  getDataSource(source: string): Observable<any> {
    this._dataSource[source] = <Observable<any>>(<unknown>'login');
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
  },
};

const fakeRouter = {
  navigate(input: Array<any>) {
    return <Promise<void>>input[0];
  },
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const CLIENT_ID = prodEnv
    ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD
    : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

  let dService: DataSourceService;
  let router: Router;

  let aService: SocialAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        //RouterTestingModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,
        SocialAuthService,
        //DataSourceService,
        { provide: DataSourceService, useValue: FakeDataSource },
        { provide: Router, useValue: fakeRouter },

        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(CLIENT_ID),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    dService = TestBed.inject(DataSourceService);
    router = TestBed.inject(Router);
    aService = TestBed.inject(SocialAuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit calls relevent methods', fakeAsync(() => {
    console.log('here is the start of the test');
    //let spy = spyOn(dService, "getDataSource").and.returnValue(<Observable<any>><unknown>"login");
    let spy = spyOn(dService, 'getDataSource').and.callThrough();

    dService.createDataSource();
    component.ngOnInit();
    tick(3);
    expect(spy).toHaveBeenCalled();
  }));

  // it('onMenuChange calls router navigate and changes datasource', () => {
  //   let rSpy = spyOn(router, 'navigate').and.callThrough();
  //   let spy = spyOn(dService, "updateDataSource").and.callThrough();
    
  //   dService.createDataSource();
  //   component.onMenuChange("calendar");

  //   expect(rSpy).toHaveBeenCalled();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('getSelectedClass returns correct response based on input', () => {
  //   component.selectedMenu = 'candidates';
  //   let response = component.getSelectedClass("candidates");

  //   expect(response == 'selected').toBeTruthy();
  //   component.selectedMenu = 'positions';
  //   response = component.getSelectedClass("positions");
  //   expect(response == 'selected').toBeTruthy();
  //   response = component.getSelectedClass("fhajgd");
  //   expect(response == '').toBeTruthy();

  //   component.selectedMenu = 'ashajj';
  //   response = component.getSelectedClass("positions");
  //   expect(response == 'selected').toBeFalsy();
  // });

  it('logout clears the local storage and calls signout', fakeAsync(() => {
    let spy = spyOn(aService, 'signOut').and.returnValue(
      <Promise<void>>(<unknown>'passed')
    );
    let rSpy = spyOn(router, 'navigate').and.callThrough();
    localStorage.clear();
    localStorage.setItem('apiKey', 'apiKey');
    localStorage.setItem('userType', 'userType');
    localStorage.setItem('ssoUser', 'ssoUser');

    tick(3);

    component.loginType = APPCONSTANTS.LOGIN_CONSTANTS.LOGIN_TYPE_SSO;
    component.logout();
    tick(3);

    expect(spy).toHaveBeenCalled();
    expect(rSpy).toHaveBeenCalled();
    expect(localStorage.getItem('apiKey')).toBeNull();

    localStorage.clear();
  }));
});
