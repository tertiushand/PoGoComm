import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';

import { NavArrowModule } from '../elements/nav-arrow/nav-arrow.module';

@NgModule({
  imports: [
    CommonModule,
    NavArrowModule
  ],
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
