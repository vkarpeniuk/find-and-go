import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FoursquareService } from './../../services/foursquare.service';
import { ActionTypes, ChangeSearchAction, ChangeWhereAction } from './actions';

@Injectable()
export class FiltersStoreEffects {
  constructor(
    private actions$: Actions,
    private foursquareService: FoursquareService
  ) {}

  @Effect()
  loadFilteredVenues$ = this.actions$.pipe(
    ofType<ChangeSearchAction>(ActionTypes.CHANGE_SEARCH),
    mergeMap(action =>
      this.foursquareService.getVenueRecommendations(
        null,
        null,
        action.payload.newSearch
      )
    )
    //map(items => new LoadCompleteAction({ items }))
  );
}
