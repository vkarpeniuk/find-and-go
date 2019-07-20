import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MapOptions, Venue } from '@models';
import * as fromRoot from '@reducers';
import * as redux from './redux';
import * as headerRedux from '../header/redux';

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
    this.loadDataFromStore();
  }

  mapOptionsChanged(newOptions: MapOptions): void {
    this.store$.dispatch(
      new headerRedux.ChangeMapLocationAction({
        latitude: newOptions.latitude,
        longitude: newOptions.longitude,
        zoom: newOptions.zoom
      })
    );
  }

  markerClick(id: string): void {
    this.store$.dispatch(new redux.ScrollToVenueAction({ id }));
  }

  venueFocused(id: string): void {
    this.store$.dispatch(new redux.VenueFocusedAction({ id }));
  }

  venuesUnfocused(): void {
    this.store$.dispatch(new redux.VenuesUnfocusedAction());
  }

  renavigate(): void {
    this.store$.dispatch(new redux.RenavigateAction());
  }

  resetScrolledVenue(): void {
    this.store$.dispatch(new redux.ResetScrolledVenueAction());
  }

  private loadDataFromStore(): void {
    this.venues$ = this.store$.pipe(select(redux.selectAllVenues));
    this.focusedVenueId$ = this.store$.pipe(select(redux.selectFocusedVenueId));
    this.scrolledVenueIdx$ = this.store$.pipe(
      select(redux.selectScrolledVenueIdx)
    );
    this.isLoading$ = this.store$.pipe(select(redux.selectIsLoading));
    this.mapOptions$ = this.store$.pipe(
      select(headerRedux.selectLocationFilter)
    );
  }
}
