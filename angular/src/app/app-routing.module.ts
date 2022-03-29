import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { LoginComponent } from './components/login/login.component';
import { PositionsComponent } from './components/positions/positions.component';

const routes: Routes = [{
    path: 'login', component: LoginComponent, pathMatch: 'full'
}, {
    path: 'candidates', component: CandidatesComponent, pathMatch: 'full'
}, {
    path: 'positions', component: PositionsComponent, pathMatch: 'full'
}, {
    path: '', redirectTo: '/login', pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
