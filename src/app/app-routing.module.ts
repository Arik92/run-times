import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatFormComponent } from './stat-form/stat-form.component';
import { ResultsComponent } from './results/results.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '',   redirectTo: '/stats', pathMatch: 'full' },
  { path: 'stats', component: StatFormComponent  },
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
