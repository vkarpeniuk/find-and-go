import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom, switchMap, tap, filter } from 'rxjs/operators';

import * as fromRoot from '@reducers';
import { FoursquareService } from '@services';
import {
  LoadRequestAction,
  ActionTypes,
  LoadCompleteAction,
  RenavigateAction,
  VenuesUnfocusedAction
} from './actions';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private store$: Store<fromRoot.State>,
    private actions$: Actions,
    private router: Router,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadVenues$ = this.actions$.pipe(
    ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
    withLatestFrom(this.store$),
    switchMap(([action, storeState]) =>
      this.foursquareService.getVenueRecommendations(
        storeState.filters.latitude,
        storeState.filters.longitude,
        storeState.filters.search,
        storeState.filters.where,
        storeState.filters.locationByMap,
        storeState.filters.zoom
      )
    ),
    map(items => new LoadCompleteAction({ items }))
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
