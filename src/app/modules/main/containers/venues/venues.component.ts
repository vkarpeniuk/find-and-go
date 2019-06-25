import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MapOptions, Venue } from '@models';
import * as fromRoot from '@reducers';
import {
  selectAllVenues,
  selectIsLoading,
  selectFocusedVenueId
} from './redux/selectors';
import { selectLocationFilter } from '../header/redux/selectors';
import { ChangeMapLocationAction } from '../header/redux/actions';
import { VenueFocusedAction, VenuesUnfocusedAction } from './redux/actions';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues$: Observable<Venue[]>;
  focusedVenueId$: Observable<string>;
  mapOptions$: Observable<MapOptions>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
    this.focusedVenueId$ = this.store$.pipe(select(selectFocusedVenueId));
    this.mapOptions$ = this.store$.pipe(select(selectLocationFilter));
    this.isLoading$ = this.store$.pipe(select(selectIsLoading));
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

  venueFocused(id: string): void {
    this.store$.dispatch(new VenueFocusedAction({ id }));
  }

  venuesUnfocused(): void {
    this.store$.dispatch(new VenuesUnfocusedAction());
  }
}
