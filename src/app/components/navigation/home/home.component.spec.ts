import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap/modal';
import { prodEnv, APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { MatMenuModule } from '@angular/material/menu';
import { DataSource } from 'src/app/shared/models/data-service';
import { HomeComponent } from './home.component';
import { Observable, of } from 'rxjs';
import { DataSourceService } from 'src/app/services/data-source.service';

const CLIENT_ID = prodEnv
  ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD
  : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dService: DataSourceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
        MatMenuModule,
      ],
      declarations: [HomeComponent],
      providers: [
        SocialAuthService,
        { provide: DataSourceService, useValue: FakeDataSource },

        BsModalService,
        DatePipe,
        FormBuilder,
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dService = TestBed.inject(DataSourceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
