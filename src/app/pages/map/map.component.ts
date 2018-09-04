import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
declare let L;

import { MapIconsService } from '../../shared/layout/map-icons/map-icons.service';
import { MapService, ViewMinMax, Coords } from '../../shared/services/map/map.service';
import { Gym } from '../../shared/api/api.types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    MapIconsService,
    MapService
  ]
})
export class MapComponent implements OnInit {

  private map;
  private gyms: Array<Gym> = [];
  private gymsLat: Observable<any[]>;
  private gymsLng: Observable<any[]>;
  private marker;
  private cursor;
  private startCoords: Coords = {lat: 39.7909, lng: -105.0844}


  private topleft;
  private topright;
  private bottomleft;
  private bottomright;


  constructor(
    private icons: MapIconsService,
    private fs: AngularFirestore,
    private mapServ: MapService
  ) {
  }

  ngOnInit() {
    

    this.map = L.map('mainMap');
    this.map.on('load', (e) =>{
      this.updateMap(e);
    })
      .setView([39.7909, -105.0844], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      this.updateMap(e);
      this.onMapClick(e);
    });

    this.map.on('moveend', (e) => {
      this.updateMap(e);
    });

    this.map.on('zoomend', (e) => {
      this.updateMap(e);
    });
  }

  onMapClick(e) {
    if (this.cursor) {
      this.cursor.removeFrom(this.map);
    }
    this.cursor = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.icons.pointer}).addTo(this.map).bindPopup('Loc: ' + e.latlng.lat + ', ' + e.latlng.lng);
  }

  updateMap(e) {
    let viewCoords: ViewMinMax = this.mapServ.findViewCoords({
      zoomLevel: 13,
      screen: {x: e.target._size.x, y: e.target._size.y},
      center: this.map.getCenter()
    });
    

    this.fs.collection('gyms', gym => gym.where('coords.lat','<',viewCoords.latMax).where('coords.lat','>',viewCoords.latMin)).valueChanges().subscribe((gymsLat: Array<Gym>) => {
      let newGyms = _.differenceWith(
        _.filter(gymsLat, (gym: Gym) => {return gym.coords.lng > viewCoords.lngMin && gym.coords.lng < viewCoords.lngMax}),
        this.gyms,
        _.isEqual
      );
      this.createGyms(newGyms);
      this.gyms = _.concat(this.gyms, newGyms);
    });
  }

  createGyms(newGyms: Array<Gym>) {
    newGyms.forEach(gym => {
      L.marker(gym.coords, {icon: this.icons.pokestop})
        .addTo(this.map)
        .bindPopup('Name: ' + gym.name);
    });
  }
}
