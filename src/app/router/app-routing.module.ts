import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
