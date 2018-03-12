import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { NormalComponent } from './normal/normal.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  },{
    path: 'normal',
    component: NormalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
