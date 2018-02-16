import { Component, OnInit } from '@angular/core';

import { MapService } from '../../shared/services/map/map.service';
//import * as mapboxgl from '../../../node_modules/mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private marker;

  constructor(
    private map: MapService
  ) { }

  ngOnInit() {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVydGl1c2hhbmQiLCJhIjoiY2pkcHVtMWI4MTN3ejMycGtqNXE4aTVrcyJ9.AzPbPtE220X4XG7B6irriA';
    var mainMap = new mapboxgl.Map({
      container: 'mainMap',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-105.0000071, 39.7529037],
      zoom: 15
    });

    mainMap.on('click', function (e) {
      if (this.marker)
        this.marker.remove();
      this.marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(mainMap);
    });
  }
}
