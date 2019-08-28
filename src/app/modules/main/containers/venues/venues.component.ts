import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MapOptions, Venue } from '@models';
import { State as RootState } from '@reducers';
import { actions, selectors } from './redux';
import {
  actions as headerActions,
  selectors as headerSelectors
} from '../header/redux';

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

  constructor(private store$: Store<RootState>) {}

  ngOnInit() {
    this.loadDataFromStore();
  }

  mapOptionsChanged(newOptions: MapOptions): void {
    this.store$.dispatch(
      new headerActions.ChangeMapLocationAction({
        latitude: newOptions.latitude,
        longitude: newOptions.longitude,
        zoom: newOptions.zoom
      })
    );
  }

  markerClick(id: string): void {
    this.store$.dispatch(new actions.ScrollToVenueAction({ id }));
  }

  venueFocused(id: string): void {
    this.store$.dispatch(new actions.VenueFocusedAction({ id }));
  }

  venuesUnfocused(): void {
    this.store$.dispatch(new actions.VenuesUnfocusedAction());
  }

  renavigate(): void {
    this.store$.dispatch(new actions.RenavigateAction());
  }

  resetScrolledVenue(): void {
    this.store$.dispatch(new actions.ResetScrolledVenueAction());
  }

  private loadDataFromStore(): void {
    this.venues$ = this.store$.pipe(select(selectors.selectAllVenues));
    this.focusedVenueId$ = this.store$.pipe(
      select(selectors.selectFocusedVenueId)
    );
    this.scrolledVenueIdx$ = this.store$.pipe(
      select(selectors.selectScrolledVenueIdx)
    );
    this.isLoading$ = this.store$.pipe(select(selectors.selectIsLoading));
    this.mapOptions$ = this.store$.pipe(
      select(headerSelectors.selectLocationFilter)
    );
  }
}
