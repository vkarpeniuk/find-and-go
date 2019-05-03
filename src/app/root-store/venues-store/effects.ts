import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { FoursquareService } from './../../services/foursquare.service';
import { State } from './state';
import { ActionTypes, LoadRequestAction, LoadCompleteAction } from './actions';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private actions$: Actions,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadAllVenues$ = this.actions$.pipe(
    ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
    mergeMap(() => this.foursquareService.getVenueRecommendations()),
    map(items => new LoadCompleteAction({ items }))
  );
}
