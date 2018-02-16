import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MapComponent } from './map/map.component';
import { MapService } from '../shared/services/map/map.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    MapComponent
  ],
  providers: [
    MapService
  ]
})
export class PagesModule { }
