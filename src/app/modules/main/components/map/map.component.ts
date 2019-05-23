import { MapLocation } from './../../../../core/models/map-location.model';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: MapLocation;
  @Output() locationChanged: EventEmitter<MapLocation> = new EventEmitter<
    MapLocation
  >();

  isInitialized: boolean;

  @ViewChild('map') mapRef: AgmMap;

  constructor() {}

  ngOnInit() {
    this.mapRef.latitude = this.location.latitude;
    this.mapRef.longitude = this.location.longitude;
  }

  mapIdle() {
    if (this.isInitialized) {
      this.locationChanged.emit({
        latitude: this.mapRef.latitude,
        longitude: this.mapRef.longitude
      });
    } else {
      this.isInitialized = true;
    }
  }
}
