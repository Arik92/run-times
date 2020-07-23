import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatFormComponent } from './stat-form/stat-form.component';
import { ResultsComponent } from './results/results.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '',   redirectTo: '/stats', pathMatch: 'full' },
  { path: 'stats', component: StatFormComponent  },
  { path: 'results', component: ResultsComponent },
  { path: '**', component:  NotFoundComponent } // catch all. login in the future  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
