import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { SidebarConfig } from './sidebar.config';
import { States } from '../../variables/states';

import { NavArrowModule } from '../elements/nav-arrow/nav-arrow.module';

@NgModule({
  imports: [
    CommonModule,
    NavArrowModule
  ],
  declarations: [
    SidebarComponent
  ],
  providers: [
    SidebarConfig,
    States
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
