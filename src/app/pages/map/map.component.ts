import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
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
  private gyms: Observable<any[]>;
  private marker;
  private cursor;

  constructor(
    private icons: MapIconsService,
    private fs: AngularFirestore
  ) {
    this.gyms = fs.collection('gyms').valueChanges();
  }

  ngOnInit() {

    this.map = L.map('mainMap').setView([39.7909, -105.0844], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.createGyms();

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

  createGyms() {
    this.gyms.subscribe(gyms => {
      gyms.forEach(gym => {
        L.marker(gym.coords, {icon: this.icons.pokestop})
          .addTo(this.map)
          .bindPopup('Name: ' + gym.name);
      });
    });
  }
}
