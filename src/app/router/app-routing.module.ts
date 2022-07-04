import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { RecruiterGuard } from './guards/recruiter.guard';
import { ROUTES } from './app.routes';

const routes: Routes = ROUTES;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginGuard, RecruiterGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
