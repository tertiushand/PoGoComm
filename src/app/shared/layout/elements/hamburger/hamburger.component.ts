import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, 
  keyframes
} from '@angular/animations';

import { States } from '../../../variables/states';

@Component({
  selector: 'hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css'],
  animations: [
    trigger('hamburgerState', [
      state('inactive', style({
        transform: 'rotate(360deg)'
      })),
      state('active',   style({
        transform: 'rotate(360deg)'
      })),
      transition('inactive => active', animate('500ms ease-in', keyframes([
        style({transform: 'scale(1.2) rotate(-180deg)', offset: 0.5}),
        style({transform: 'scale(1) rotate(-180deg)', offset: 1.0})
      ]))),
      transition('active => inactive', animate('500ms ease-out', keyframes([
        style({transform: 'scale(1.2) rotate(180deg)', offset: 0.5}),
        style({transform: 'scale(1) rotate(180deg)', offset: 1.0})
      ])))
    ])
  ]
})
export class HamburgerComponent {
  @Output() onToggle = new EventEmitter();
  public currentState: string;

  constructor(
    public states: States
  ) { }

  burgerToggle() {
    this.currentState = this.currentState === this.states.active?this.states.inactive:this.states.active;
    this.onToggle.emit(this.currentState);
  }

}
