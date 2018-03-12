import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  animations: [
    trigger('navbarState', [
      state('inactive', style({
        left: '0'
      })),
      state('active',   style({
        left: '16em'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class PagesComponent implements OnInit {
  private menuState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  updateMenu(state: string) {
    this.menuState = state;
  }

}
