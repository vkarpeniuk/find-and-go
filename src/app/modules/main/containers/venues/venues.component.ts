import { MapLocation } from './../../../../core/models/map-location.model';
import { Venue } from './../../../../core/models/venue.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { selectAllVenues } from '../../store/selectors/venues';
import { selectLocationFilter } from '../../store/selectors/filters';
import { ChangeMapLocationAction } from '../../store/actions/filters';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues$: Observable<Venue[]>;
  location$: Observable<MapLocation>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
    this.location$ = this.store$.pipe(select(selectLocationFilter));
  }

  mapLocationChanged(newLocation: MapLocation): void {
    this.store$.dispatch(
      new ChangeMapLocationAction({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude
      })
    );
  }
}
