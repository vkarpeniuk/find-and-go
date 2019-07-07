import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MapOptions, Venue } from '@models';
import * as fromRoot from '@reducers';
import {
  selectAllVenues,
  selectIsLoading,
  selectFocusedVenueId,
  selectScrolledVenueIdx
} from './redux/selectors';
import { selectLocationFilter } from '../header/redux/selectors';
import { ChangeMapLocationAction } from '../header/redux/actions';
import {
  VenueFocusedAction,
  VenuesUnfocusedAction,
  RenavigateAction,
  ScrollToVenueAction,
  ResetScrolledVenueAction
} from './redux/actions';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues$: Observable<Venue[]>;
  focusedVenueId$: Observable<string>;
  mapOptions$: Observable<MapOptions>;
  scrolledVenueIdx$: Observable<number>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
    this.focusedVenueId$ = this.store$.pipe(select(selectFocusedVenueId));
    this.scrolledVenueIdx$ = this.store$.pipe(
      select(selectScrolledVenueIdx)
    );
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

  markerClick(id: string): void {
    this.store$.dispatch(new ScrollToVenueAction({ id }));
  }

  venueFocused(id: string): void {
    this.store$.dispatch(new VenueFocusedAction({ id }));
  }

  venuesUnfocused(): void {
    this.store$.dispatch(new VenuesUnfocusedAction());
  }

  renavigate(): void {
    this.store$.dispatch(new RenavigateAction());
  }

  resetScrolledVenue(): void {
    this.store$.dispatch(new ResetScrolledVenueAction());
  }
}
