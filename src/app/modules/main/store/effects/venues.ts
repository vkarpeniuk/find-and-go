import { FoursquareService } from '../../../../core/services/foursquare.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  LoadRequestAction,
  ActionTypes,
  LoadCompleteAction
} from '../actions/venues';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private store$: Store<State>,
    private actions$: Actions,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadVenues$ = this.actions$.pipe(
    ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
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
}
