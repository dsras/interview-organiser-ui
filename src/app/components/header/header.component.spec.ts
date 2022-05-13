import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { prodEnv, APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';

import { HeaderComponent } from './header.component';


const FakeDataSource: Pick<DataSourceService, 'getDataSource'> = {
  getDataSource(source: string): Observable<any> {
    return of("login");
  },
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;

  let dService: DataSourceService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder, 
        SocialAuthService,
        DataSourceService,
        //{provide: DataSourceService, useValue: FakeDataSource},

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
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    dService = TestBed.inject(DataSourceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //! data source service disconnected from private member variable internal to component
  it("ngOnInit calls relevent methods", fakeAsync(() => {
    // //attempt 1
    // let spy = spyOn(dService, "getDataSource").and.returnValue(<Observable<any>><unknown>"login");

    // component.ngOnInit();
    // tick(3);

    // expect(spy).toHaveBeenCalled();

    // //attempt 2
    // component.initService();
    // component.updateService('route', 'login');
    // component.ngOnInit();
    // tick(3);
    // expect(component.isHeader == false).toBeTruthy();
    
    // component.updateService('route', 'cal');
    // component.ngOnInit();
    // tick(3);
    // expect(component.isHeader == true).toBeTruthy();
    
  }));

  it('menu change calls navigate and update, and updates source variables', () => {
    
  });
});
