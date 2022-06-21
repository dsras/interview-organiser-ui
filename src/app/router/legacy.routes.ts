import { Routes } from "@angular/router";
import { CalendarComponent } from "../components/calendar/calendar.component";
import { AllInterviewsComponent } from "../components/dashboard/all-interviews/all-interviews.component";
import { CompletedInterviewsComponent } from "../components/dashboard/completed-interviews/completed-interviews.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { LoginComponent } from "../components/login/login.component";
import { HomeComponent } from "../components/navigation/home/home.component";
import { LoginGuard } from "./guards/login.guard";
import { RecruiterGuard } from "./guards/recruiter.guard";

export const legacyRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
      pathMatch: 'full',
    },
    {
      path: 'all-interviews',
      component: AllInterviewsComponent,
      pathMatch: 'full',
      canActivate: [LoginGuard, RecruiterGuard],
    },
    {
      path: 'dashboard/completed-interviews',
      component: CompletedInterviewsComponent,
      pathMatch: 'full',
      canActivate: [LoginGuard, RecruiterGuard],
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      pathMatch: 'full',
      canActivate: [LoginGuard, RecruiterGuard],
    },
    {
      path: 'calendar',
      component: CalendarComponent,
      pathMatch: 'full',
      canActivate: [LoginGuard],
      canActivateChild: [LoginGuard]
    },
    {
      path: '',
      redirectTo: '/calendar',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: '/calendar',
      pathMatch: 'full',
    },
  ];