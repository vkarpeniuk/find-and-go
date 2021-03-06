import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';

import { FoursquareService } from '@services';
import { State } from './reducers';
import { LoadRequestAction, ActionTypes, LoadCompleteAction } from './actions';

@Injectable()
export class VenueDetailsStoreEffects {
  constructor(
    private store$: Store<State>,
    private actions$: Actions,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadVenues$ = this.actions$.pipe(
    ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
    withLatestFrom(this.store$),
    switchMap(([action]) =>
      this.foursquareService.getVenueDetails(action.payload.id)
    ),
    map(venue => new LoadCompleteAction({ venue }))
  );
}
