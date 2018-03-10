import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuState = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  updateMenu(state: string) {
    this.menuState.emit(state);
  }

}
