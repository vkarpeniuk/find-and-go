import { ActionTypes } from './../actions/filters';
import { FoursquareService } from '../../../../core/services/foursquare.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoadCompleteAction } from '../actions/venues';
import { State } from '../reducers';

@Injectable()
export class FiltersStoreEffects {
  constructor(
    private store$: Store<State>,
    private actions$: Actions,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadFilteredVenues$ = this.actions$.pipe(
    ofType(ActionTypes.CHANGE_SEARCH, ActionTypes.CHANGE_WHERE),
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this.foursquareService.getVenueRecommendations(
        null,
        null,
        storeState.filters.search,
        storeState.filters.where
      )
    ),
    map(items => new LoadCompleteAction({ items }))
  );
}
