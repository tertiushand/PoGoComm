import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseService implements OnInit{

  constructor() { }

  ngOnInit() {
    var database = firebase.database();
  }

}
