import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule, SharedModule, AppRoutingModule
  ],
  exports: [NavbarComponent]
})
export class NavigationModule { }
