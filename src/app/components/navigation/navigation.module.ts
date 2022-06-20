import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MyCalendarModule } from '../calendar/calendar.module';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [ToolbarComponent, HomeComponent, SidenavComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    DashboardModule,
    MyCalendarModule,
  ],
  exports: [ToolbarComponent, HomeComponent, SidenavComponent],
})
export class NavigationModule {}
