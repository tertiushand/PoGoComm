import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, 
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('navbarState', [
      state('inactive', style({
        left: '-16em'
      })),
      state('active',   style({
        left: '0'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Input() showNavbar;

  constructor() { }

  ngOnInit() {
  }

}
