import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
    
    private mapboxgl =  require('mapbox-gl/dist/mapbox-gl.js');

    constructor() { }
    
    addMarker(coordinates: Array<number>, map) {
        return new this.mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    }

    hasImage(img_name, map) {
        return map.hasImage(img_name);
    }

    addImage(name: string, image_path: string, map) {
        map.loadImage(image_path, function(error, image) {
        if (error) throw error;
        map.addImage(name, image);
        });
    }

    addIcon(img_name, coordinates: Array<number>, size: number, map, img_path?) {
        map.loadImage(img_path, function(error, image) {
            if (error) throw error;

            if (!map.hasImageimg_name)
                map.addImage(img_name, image);
            map.addLayer({
                "id": img_name,
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": coordinates
                            }
                        }]
                    }
                },
                "layout": {
                    "icon-image": img_name,
                    "icon-size": size
                }
            });
        });
    };

    removeIcon(img_name, map){
        map.removeLayer(img_name);
    };

}
