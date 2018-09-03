import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { NormalComponent } from './normal/normal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  }, {
    path: 'normal',
    component: NormalComponent
  }, {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
