import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
declare let L;

import { MapIconsService } from '../../layout/map-icons/map-icons.service';
import { Gym } from '../../api/api.types';

@Injectable()
export class MapService {

    constructor(
        private icons: MapIconsService,
        private fs: AngularFirestore,
        private auth: AngularFireAuth
    ) { }

    findViewCoords(mapInfo: MapInfo): ViewMinMax {
        let zoomRatio = 0.540672;
        const zoom = mapInfo.zoomLevel;

        for (let i = 0; i < zoom; i++ ) {
            zoomRatio = zoomRatio / 2;
        }

        const latView = mapInfo.screen.y * zoomRatio;
        const lngView = mapInfo.screen.x * zoomRatio * 1.30303;

        return {
            latMax: mapInfo.center.lat + latView,
            latMin: mapInfo.center.lat - latView,
            lngMax: mapInfo.center.lng + lngView,
            lngMin: mapInfo.center.lng - lngView
        };
    }

    /********************* Create Items on the Map ******************************/
    createCursor(coords: Coords, map: LeafletMap, popup?: any) {
        if (popup) {
            return L.marker(coords, {icon: this.icons.pointer}).addTo(map).bindPopup(popup).openPopup();
        } else {
            return L.marker(coords, {icon: this.icons.pointer}).addTo(map);
        }
    }

    createGym(gym: GymSimple, map: LeafletMap) {
        L.marker(gym.coords, {icon: this.icons.gymEmpty})
            .addTo(map)
            .bindPopup('Name: ' + gym.name);
    }

    createPokestop(pokeStop: Gym, map: LeafletMap) {
        L.marker(pokeStop.coords, {icon: this.icons.pokestop})
            .addTo(map)
            .bindPopup('Name: ' + pokeStop.name);
    }

    createButton(label: string, container: any) {
        const btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    createInput(label: string, container: any) {
        const input = L.DomUtil.create('input', 'name', container);
        input.setAttribute('type', 'text');
        return input;
    }

    /***************************** Add Items to the database *******************************/
    addGym(newGym: GymSimple): Promise<any> {
        return this.fs.collection('gyms').add({
            coords: newGym.coords,
            creation: {
                timeStamp: firestore.Timestamp.now(),
                uid: this.auth.auth.currentUser.uid
            },
            exElig: newGym.exElig ? newGym.exElig : false,
            name: newGym.name,
            raids: []
        }).catch(error => {
            console.log('something went wrong with the add');
        });
    }

    addPokestop(newPokestop: any) {

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

export class GymSimple {
    coords: Coords;
    name: string;
    exElig?: boolean;
}

export class LeafletMap {

}
