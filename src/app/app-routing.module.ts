import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatFormComponent } from './stat-form/stat-form.component';
import { ResultsComponent } from './results/results.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'stats', component: StatFormComponent },
    { path: 'home', component: HomeComponent },
  ]  },  
  { path: 'stats-freeform', component: StatFormComponent  },
  { path: 'results', component: ResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component:  NotFoundComponent } // catch all. login in the future  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
