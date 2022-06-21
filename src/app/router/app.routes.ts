import { Routes } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AllInterviewsComponent } from '../components/dashboard/all-interviews/all-interviews.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RecruiterGuard } from './guards/recruiter.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
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
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
];