import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavArrowComponent } from './nav-arrow.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavArrowComponent],
  exports: [NavArrowComponent]
})
export class NavArrowModule { }
