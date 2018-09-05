import { Injectable } from '@angular/core';
declare let L;

@Injectable()
export class MapIconsService {

  public pokestop = L.icon({
    iconUrl: 'assets/imgs/icons/pokestop-4b.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  public pokestopLure = L.icon({
    iconUrl: 'assets/imgs/icons/pokestop-4b.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  public gymEmpty = L.icon({
    iconUrl: 'assets/imgs/icons/gym-grey.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
  });

  public gymValor = L.icon({
    iconUrl: 'assets/imgs/icons/gym-red.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  public gymMystic = L.icon({
    iconUrl: 'assets/imgs/icons/gym-blue.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  public gymInstinct = L.icon({
    iconUrl: 'assets/imgs/icons/gym-yellow.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
  });

  public pointer = L.icon({
    iconUrl: 'assets/imgs/icons/pointer.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  constructor() { }

}
