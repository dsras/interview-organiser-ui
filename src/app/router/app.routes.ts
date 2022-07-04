import { Routes } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { MyInterviewsComponent } from '../components/calendar/my-interviews/my-interviews.component';
import { AllInterviewsComponent } from '../components/dashboard/all-interviews/all-interviews.component';
import { LoginComponent } from '../components/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginGuard } from './guards/login.guard';
import { RecruiterGuard } from './guards/recruiter.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'calendar',
    canActivate: [LoginGuard],
    pathMatch: 'full',
    component: CalendarComponent,
  },
  {
    path: 'all-interviews',
    component: AllInterviewsComponent,
    canActivate: [LoginGuard, RecruiterGuard],
  },
  {
    path: 'my-interviews',
    component: MyInterviewsComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
];
