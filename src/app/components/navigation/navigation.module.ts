import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NavbarComponent, ToolbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  exports: [NavbarComponent, ToolbarComponent],
})
export class NavigationModule {}
