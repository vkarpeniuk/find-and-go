import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { LoadRequestAction, ActionTypes, LoadCompleteAction } from './actions';
import { Store } from '@ngrx/store';
import { FoursquareService } from 'src/app/core/services';
import * as fromRoot from 'src/app/reducers';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private store$: Store<fromRoot.State>,
    private actions$: Actions,
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
}
