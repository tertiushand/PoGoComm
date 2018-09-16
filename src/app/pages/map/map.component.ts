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
  private cursor;
  private startCoords: Coords = {lat: 39.7909, lng: -105.0844};
  private cursorLocation: Coords = this.startCoords;
  private currentZoom = 13;

  private popupContainer = L.DomUtil.create('div');
  private pokestopBtn = this.mapServ.createButton('pokestop', this.popupContainer);
  private gymBtn = this.mapServ.createButton('gym', this.popupContainer);

  constructor(
    private icons: MapIconsService,
    private fs: AngularFirestore,
    private mapServ: MapService
  ) {
  }

  ngOnInit() {

    this.map = L.map('mainMap');
    this.map.on('load', (e) =>
      this.updateMap(e)
    )
      .setView(this.startCoords, this.currentZoom);

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

    L.DomEvent.on(this.pokestopBtn, 'click', () => {
      alert('Pokestop at ' + JSON.stringify(this.cursorLocation));
    });

    L.DomEvent.on(this.gymBtn, 'click', () => {
      this.mapServ.addGym({
        coords: this.cursorLocation,
        name: 'New Gym'
      });
    });
  }

  onMapClick(e) {
    if (this.cursor) {
      this.cursor.removeFrom(this.map);
    }

    this.cursorLocation = {lat: e.latlng.lat, lng: e.latlng.lng};
    this.cursor = this.mapServ.createCursor(
      {lat: e.latlng.lat, lng: e.latlng.lng},
      this.map,
      this.popupContainer
    );
  }

  updateMap(e) {
    if (e.target._animateToZoom) {
      this.currentZoom = e.target._animateToZoom;
    }

    const viewCoords: ViewMinMax = this.mapServ.findViewCoords({
      zoomLevel: this.currentZoom,
      screen: {x: e.target._size.x, y: e.target._size.y},
      center: this.map.getCenter()
    });

    this.fs.collection('gyms', gym => gym
      .where('coords.lat', '<', viewCoords.latMax)
      .where('coords.lat', '>', viewCoords.latMin))
      .valueChanges()
      .subscribe((gymsLat: Array<Gym>) => {
        const newGyms = _.differenceWith(
          _.filter(gymsLat, (gym: Gym) => gym.coords.lng > viewCoords.lngMin && gym.coords.lng < viewCoords.lngMax),
          this.gyms,
          _.isEqual
        );
        this.createGyms(newGyms);
        this.gyms = _.concat(this.gyms, newGyms);
    });
  }

  createGyms(newGyms: Array<Gym>) {
    newGyms.forEach(gym => {
      this.mapServ.createGym(gym, this.map);
    });
  }
}
