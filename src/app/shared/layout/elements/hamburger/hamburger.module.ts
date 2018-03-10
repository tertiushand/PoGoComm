import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerComponent } from './hamburger.component';
import { States } from '../../../variables/states'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    States
  ],
  declarations: [HamburgerComponent],
  exports: [HamburgerComponent]
})
export class HamburgerModule { }
