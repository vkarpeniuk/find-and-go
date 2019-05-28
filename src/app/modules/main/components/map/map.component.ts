import { MapMarker } from './../../../../core/models/map-marker.model';
import { Venue } from './../../../../core/models/venue.model';
import { MapOptions } from '../../../../core/models/map-options.model';
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
  markers: MapMarker[];

  @ViewChild('map') mapRef: AgmMap;

  constructor() {}

  ngOnInit() {
    this.mapRef.latitude = this.mapOptions.latitude;
    this.mapRef.longitude = this.mapOptions.longitude;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.venues) {
      this.initMarkers();
    }
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
}
