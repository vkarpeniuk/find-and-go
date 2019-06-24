import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { AgmMap } from '@agm/core';

import { MapMarker, Venue, MapOptions } from '@models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() venues: Venue[];
  @Input() mapOptions: MapOptions;
  @Output() mapUpdated: EventEmitter<MapOptions> = new EventEmitter<
    MapOptions
  >();

  isInitialized: boolean;
  latitude: number;
  longitude: number;
  zoom: number;
  markers: MapMarker[];

  @ViewChild('map') mapRef: AgmMap;

  constructor() {}

  ngOnInit() {
    this.initMapOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.venues) {
      this.initMarkers();
    }
    if (changes.mapOptions) {
      this.initMapOptions();
    }
  }

  initMapOptions(): void {
    this.latitude = this.mapOptions.latitude;
    this.longitude = this.mapOptions.longitude;
    this.zoom = this.mapOptions.zoom;
  }

  initMarkers(): void {
    this.markers = this.venues.map(v => {
      return {
        latitude: v.latitude,
        longitude: v.longitude,
        id: v.id,
        name: v.name,
        address: v.address
      };
    });
  }

  mapIdle(): void {
    if (this.isInitialized) {
      this.mapUpdated.emit({
        latitude: this.mapRef.latitude,
        longitude: this.mapRef.longitude,
        zoom: this.mapRef.zoom
      });
    } else {
      this.isInitialized = true;
    }
  }

  trackMarkers(index: number, item: MapMarker) {
    return item.id;
  }
}
