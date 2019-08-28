import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom, switchMap, tap, filter } from 'rxjs/operators';

import { State as RootState } from '@reducers';
import { FoursquareService, GoogleService } from '@services';
import {
  LoadRequestAction,
  ActionTypes,
  LoadCompleteAction,
  RenavigateAction,
  VenuesUnfocusedAction,
  LoadPhotosCompleteAction
} from './actions';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private router: Router,
    private foursquareService: FoursquareService,
    private googleService: GoogleService
  ) {}

  @Effect()
  loadVenues$ = this.actions$.pipe(
    ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
    withLatestFrom(this.store$),
    switchMap(([action, storeState]) =>
      this.foursquareService.getVenueRecommendations({
        latitude: storeState.filters.latitude,
        longitude: storeState.filters.longitude,
        search: storeState.filters.search,
        near: storeState.filters.where,
        locationByMap: storeState.filters.locationByMap,
        zoomLevel: storeState.filters.zoom,
        limit: 20,
        offset: 0
      })
    ),
    map(items => new LoadCompleteAction({ items }))
  );

  @Effect()
  loadVenuesComplete$ = this.actions$.pipe(
    ofType<LoadCompleteAction>(ActionTypes.LOAD_COMPLETE),
    withLatestFrom(this.store$),
    switchMap(([action, storeState]) =>
      this.googleService.getPlacesPhotosUrls(storeState.venues.venues)
    ),
    map(venuesPhotos => new LoadPhotosCompleteAction({ venuesPhotos }))
  );

  @Effect()
  backNavigation$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    withLatestFrom(this.store$),
    filter(
      ([action, storeState]) =>
        storeState.venues.focusedVenueId &&
        storeState.router.state.url === '/venues'
    ),
    map(() => new VenuesUnfocusedAction())
  );

  @Effect({ dispatch: false })
  renavigate$ = this.actions$.pipe(
    ofType<RenavigateAction>(ActionTypes.RENAVIGATE),
    tap(() => {
      this.router.navigateByUrl('/venues');
    })
  );
}
