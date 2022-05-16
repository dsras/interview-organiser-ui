import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RecruiterGuard } from './guards/recruiter.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
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
  },
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/calendar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
