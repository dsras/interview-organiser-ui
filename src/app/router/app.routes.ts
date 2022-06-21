import { Routes } from '@angular/router';
import { AllInterviewsComponent } from '../components/dashboard/all-interviews/all-interviews.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/navigation/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { RecruiterGuard } from './guards/recruiter.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'all-interviews',
    component: AllInterviewsComponent,
    canActivate: [LoginGuard, RecruiterGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
