import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { prodEnv, APPCONSTANTS } from 'src/app/common/constants/app.constant';
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
        //DataSourceService,
        {provide: DataSourceService, useValue: FakeDataSource},

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
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
