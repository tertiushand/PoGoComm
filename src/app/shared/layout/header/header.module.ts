import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import { HamburgerModule } from '../elements/hamburger/hamburger.module';

@NgModule({
  imports: [
    CommonModule,
    HamburgerModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
