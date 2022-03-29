import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

// const routes: Routes = [{
//   path: 'login', component: LoginComponent, pathMatch: 'full'
// }, {
//   path: 'candidates', component: CandidatesComponent, pathMatch: 'full'
// }, {
//   path: 'positions', component: PositionsComponent, pathMatch: 'full'
// }, {
//   path: '', redirectTo: '/login', pathMatch: 'full'
// }];

const routes: Routes = [{
  path: 'login', component: LoginComponent, pathMatch: 'full'
}, {
  path: '', redirectTo: '/login', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
