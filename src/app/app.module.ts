import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

// [application components]
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalendarModule } from './components/calendar/calendar.module';
import { CreateInterviewComponent } from './components/dashboard/create-interview/create-interview.component';
import { AddApplicantComponent } from './components/dashboard/add-applicant/add-applicant.component';
import { AllInterviewsComponent } from './components/dashboard/all-interviews/all-interviews.component';

// [application Services]
import { AppInterceptor } from './components/interceptor/app.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APPCONSTANTS, prodEnv } from './common/constants/app.constant';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FindInterviewComponent } from './components/dashboard/find-interview/find-interview.component';
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
import { Requester } from './services/requester/requester.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DataSourceService } from './services/data-source.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

const CLIENT_ID = prodEnv
  ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD
  : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    FindInterviewComponent,
    CreateInterviewComponent,
    AddApplicantComponent,
    AllInterviewsComponent,
  ],
  imports: [
    BrowserModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
