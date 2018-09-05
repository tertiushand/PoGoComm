import { Injectable } from '@angular/core';
declare let L;

import { MapIconsService } from '../../layout/map-icons/map-icons.service';
import { Gym } from '../../api/api.types';

@Injectable()
export class MapService {    

    constructor(
        private icons: MapIconsService
    ) { }

    findViewCoords(mapInfo: MapInfo): ViewMinMax {
        let zoomRatio = 0.540672;
        let zoom = mapInfo.zoomLevel;

        for (let i = 0; i < zoom; i++ ) {
            zoomRatio = zoomRatio / 2;
        }

        let latView = mapInfo.screen.y * zoomRatio;
        let lngView = mapInfo.screen.x * zoomRatio * 1.30303;

        return {
            latMax: mapInfo.center.lat + latView,
            latMin: mapInfo.center.lat - latView,
            lngMax: mapInfo.center.lng + lngView,
            lngMin: mapInfo.center.lng - lngView
        }
    }

    createCursor(coords: Coords, map: LeafletMap, popup?: string) {
        if (popup)
            return L.marker(coords, {icon: this.icons.pointer}).addTo(map).bindPopup(popup);
        else
            return L.marker(coords, {icon: this.icons.pointer}).addTo(map);
    }

    createGym(gym: Gym, map: LeafletMap) {
        L.marker(gym.coords, {icon: this.icons.gymEmpty})
            .addTo(map)
            .bindPopup('Name: ' + gym.name);
    }

    createPokestop(pokeStop: Gym, map: LeafletMap) {
        L.marker(pokeStop.coords, {icon: this.icons.pokestop})
            .addTo(map)
            .bindPopup('Name: ' + pokeStop.name);
    }

}

export class MapInfo {
    zoomLevel: number;
    screen: Screen;
    center: Coords;
}

export class Screen {
    x: number;
    y: number;
}

export class Coords {
    lat: number;
    lng: number;
}

export class ViewMinMax {
    latMax: number;
    latMin: number;
    lngMax: number;
    lngMin: number;
}

export class LeafletMap {

}
