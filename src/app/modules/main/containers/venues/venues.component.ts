import { MapOptions } from '../../../../core/models/map-options.model';
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
  mapOptions$: Observable<MapOptions>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
    this.mapOptions$ = this.store$.pipe(select(selectLocationFilter));
  }

  mapOptionsChanged(newOptions: MapOptions): void {
    this.store$.dispatch(
      new ChangeMapLocationAction({
        latitude: newOptions.latitude,
        longitude: newOptions.longitude,
        zoom: newOptions.zoom
      })
    );
  }
}
