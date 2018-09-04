import { Coords }  from '../services/map/map.service';
import { Time } from '@angular/common';

export interface Gym {
    coords: Coords;
    creation: Creation;
    exElig: boolean;
    name: string;
    raids: Array<string>;
}

export interface Creation {
    timeStamp: Time;
    uid: string;
}