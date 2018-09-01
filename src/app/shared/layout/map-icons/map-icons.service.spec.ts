import { TestBed, inject } from '@angular/core/testing';

import { MapIconsService } from './map-icons.service';

describe('MapIconsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapIconsService]
    });
  });

  it('should be created', inject([MapIconsService], (service: MapIconsService) => {
    expect(service).toBeTruthy();
  }));
});
