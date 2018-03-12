import { Component, Input, OnInit } from '@angular/core';
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
  @Input() incomingState;
  private currentState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

}
