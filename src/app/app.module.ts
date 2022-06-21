import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';

// [Bootstrap]

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// [application components]
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';

// [application modules]
import { MyCalendarModule } from './components/calendar/calendar.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AppRoutingModule } from './router/app-routing.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { SharedModule } from './shared/shared.module';

// [application Services]
import { AppInterceptor } from './components/interceptor/app.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APPCONSTANTS, prodEnv } from './shared/constants/app.constant';
import { Requester } from './services/requester/requester.service';

const CLIENT_ID = prodEnv
  ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD
  : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;
@NgModule({
  declarations: [AppComponent, LoginComponent,],
  imports: [
    BrowserModule,
    DashboardModule,
    NavigationModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot({}),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MyCalendarModule,
    TimepickerModule,
    FlexLayoutModule,

    // GoogleLoginProvider,
    // SocialUser
  ],
  providers: [
    Requester,
    DatePipe,
    LoginComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID),
            //provider: new GoogleLoginProvider('61469011957-etn1feijdcp2ap3af8sh6ri9pkf9v444.apps.googleusercontent.com')
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  exports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
