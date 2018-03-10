import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  constructor() { }

  ngOnInit() {
    var database = firebase.database();
  }

}
