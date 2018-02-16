import { Injectable } from '@angular/core';

@Injectable()
export class MapService {

  constructor() { }

  addImage(name: string, image_path: string, map) {
    map.loadImage(image_path, function(error, image) {
      if (error) throw error;
      map.addImage(name, image);
    });
  }

  addIcon(coordinates: Array<number>, zoom: number, img_name, map) {
    map.loadImage('', function(error, image) {
    if (error) throw error;
    map.addLayer({
        "id": "points",
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
            "icon-size": zoom
        }
    });
    });
  };
}
