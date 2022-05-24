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
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// [application components]
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';

// [application modules]
import { MyCalendarModule } from './components/calendar/calendar.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AppRoutingModule } from './router/app-routing.module';
import { NavigationModule } from './components/navigation/navigation.module';

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
    MDBBootstrapModulesPro.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    StoreModule.forRoot({}),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot(),
    SocialLoginModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    MyCalendarModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    TimepickerModule,
    FlexLayoutModule,

    // GoogleLoginProvider,
    // SocialUser
  ],
  providers: [
    MDBSpinningPreloader,
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
