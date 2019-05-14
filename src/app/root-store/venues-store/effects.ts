import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FoursquareService } from './../../services/foursquare.service';
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
