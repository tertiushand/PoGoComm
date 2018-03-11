import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, 
  keyframes
} from '@angular/animations';

@Component({
  selector: 'nav-arrow',
  templateUrl: './nav-arrow.component.html',
  styleUrls: ['./nav-arrow.component.css'],
  animations: [
    trigger('arrowState', [
      state('inactive', style({
        transform: 'rotate(0deg)'
      })),
      state('active',   style({
        transform: 'rotate(90deg)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class NavArrowComponent implements OnInit {

  @Output() arrowState = new EventEmitter();
  private currentState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  toggleState() {
    this.currentState = this.currentState === 'active'?'inactive':'active';
    this.arrowState.emit(this.currentState);
  }

}
