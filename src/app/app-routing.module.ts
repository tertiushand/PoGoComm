import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesModule } from './pages/pages.module';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'map'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }