import { Injectable } from '@angular/core';

@Injectable()
export class MapService {    

    constructor() { }

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
