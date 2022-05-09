import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';


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
    canActivate: [LoginGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
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
  providers: [LoginGuard, RoleGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
