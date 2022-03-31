import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
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

// [application components]
import { LoginComponent } from './components/login/login.component';
import { PositionsComponent } from './components/positions/positions.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { HeaderComponent } from './components/header/header.component';

// [application Services]
import { DataSourceService } from './services/data-source.service';
import { CreatePositionComponent } from './components/positions/create-position/create-position.component';
import { AppInterceptor } from './interceptor/app.interceptor';
import { JobDescriptionComponent } from './components/positions/job-description/job-description.component';
import { CandidateMappingComponent } from './components/positions/candidate-mapping/candidate-mapping.component';
import { AuditTrailComponent } from './components/positions/audit-trail/audit-trail.component';
import { PositionListingComponent } from './components/positions/position-listing/position-listing.component';
import { PositionDetailsComponent } from './components/positions/position-details/position-details.component';
import { MappedCandidatesComponent } from './components/positions/mapped-candidates/mapped-candidates.component';
import { PillComponent } from './components/pill/pill.component';
import { ModalComponent } from './components/modal/modal.component';
import { CandidateAuditTrailComponent } from './components/candidates/candidate-audit-trail/candidate-audit-trail.component';
import { AddCandidateComponent } from './components/candidates/add-candidate/add-candidate.component';
import { CandidateNameRendererComponent } from './components/candidates/cell-renderers/candidate-name-renderer/candidate-name-renderer.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CandidateEditRendererComponent } from './components/candidates/cell-renderers/candidate-edit-renderer/candidate-edit-renderer.component';
import { PositionDetailsHeaderComponent } from './components/positions/position-details/position-details-header/position-details-header.component';
import { PositionDetailsInfoComponent } from './components/positions/position-details/position-details-info/position-details-info.component';
import { CandidateStatusFormatterComponent } from './components/candidates/cell-renderers/candidate-status-formatter/candidate-status-formatter.component';
import { DatePipe } from './pipes/date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APPCONSTANTS, prodEnv } from './constants/app.constant';
import { GridComponent } from './components/grid/grid.component';
import { MappedCandidateEditComponent } from './components/candidates/cell-renderers/mapped-candidate-edit/mapped-candidate-edit.component';
import { ExperiencePipe } from './pipes/experience.pipe';
import { SkillRendererComponent } from './components/candidates/cell-renderers/skill-renderer/skill-renderer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgingRendererComponent } from './components/candidates/cell-renderers/aging-renderer/aging-renderer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AvailabilityFormComponent } from './forms/availability-form/availability-form.component';
import { SkillFormComponent } from './forms/skill-form/skill-form.component';

import { MyCalendarModule } from './components/calendar/module'

const CLIENT_ID = (prodEnv) ? APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_PROD : APPCONSTANTS.SSO_CONSTANTS.CLIENT_ID_DEV;
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PositionsComponent,
        CandidatesComponent,
        HeaderComponent,
        CreatePositionComponent,
        JobDescriptionComponent,
        CandidateMappingComponent,
        AuditTrailComponent,
        PositionListingComponent,
        PositionDetailsComponent,
        MappedCandidatesComponent,
        PillComponent,
        ModalComponent,
        CandidateAuditTrailComponent,
        AddCandidateComponent,
        CandidateNameRendererComponent,
        CandidateEditRendererComponent,
        PositionDetailsHeaderComponent,
        PositionDetailsInfoComponent,
        CandidateStatusFormatterComponent,
        DatePipe,
        GridComponent,
        MappedCandidateEditComponent,
        ExperiencePipe,
        SkillRendererComponent,
        AgingRendererComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
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
        MyCalendarModule
    ],
    providers: [
        DataSourceService,
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
