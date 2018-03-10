import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerComponent } from './hamburger.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HamburgerComponent],
  exports: [HamburgerComponent]
})
export class HamburgerModule { }
