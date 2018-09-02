import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
declare let L;

import { MapIconsService } from '../../shared/layout/map-icons/map-icons.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapIconsService]
})
export class MapComponent implements OnInit {

  private map;
  private marker;
  private cursor;

  constructor(
    private icons: MapIconsService
  ) { }

  ngOnInit() {

    this.map = L.map('mainMap').setView([39.7909, -105.0844], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const marker = L.marker([39.79973, -105.07814], {icon: this.icons.pokestop}).addTo(this.map);
    marker.bindPopup('<b>Hello world!</b><br>I am a popup.');

    this.map.on('click', (e) => {
      this.onMapClick(e);
    });
  }

  onMapClick(e) {
    if (this.cursor) {
      this.cursor.removeFrom(this.map);
    }
    this.cursor = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.icons.pointer}).addTo(this.map);
  }
}
