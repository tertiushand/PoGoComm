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


  private topleft;
  private topright;
  private bottomleft;
  private bottomright;


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

    this.map.on('zoomend', (e) => {
      console.log(e);
      if (this.topleft) {
        this.topleft.removeFrom(this.map);
        this.topright.removeFrom(this.map);
        this.bottomleft.removeFrom(this.map);
        this.bottomright.removeFrom(this.map);
      }

      let zoomRatio = 0.540672;
      let zoom = e.target._zoom;

      for (let i = 0; i < zoom; i++ ) {
        zoomRatio = zoomRatio / 2;
      }

      let perLatPix = zoomRatio;
      let perLngPix = perLatPix * 1.30303;//0.000086;
      let x = e.target._size.x;
      let y = e.target._size.y;
      let latView = y * perLatPix;
      let lngView = x * perLngPix;
      let centerLat = e.target._animateToCenter.lat;
      let centerLng = e.target._animateToCenter.lng;
      let maxLat = centerLat + latView;
      let minLat = centerLat - latView;
      let maxLng = centerLng + lngView;
      let minLng = centerLng - lngView;

      this.topleft = L.marker([maxLat, maxLng], {icon: this.icons.pointer}).addTo(this.map);
      this.topright = L.marker([maxLat, minLng], {icon: this.icons.pointer}).addTo(this.map);
      this.bottomleft = L.marker([minLat, maxLng], {icon: this.icons.pointer}).addTo(this.map);
      this.bottomright = L.marker([minLat, minLng], {icon: this.icons.pointer}).addTo(this.map);

    });
  }

  onMapClick(e) {
    if (this.cursor) {
      this.cursor.removeFrom(this.map);
    }
    this.cursor = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.icons.pointer}).addTo(this.map).bindPopup('Loc: ' + e.latlng.lat + ', ' + e.latlng.lng);
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
