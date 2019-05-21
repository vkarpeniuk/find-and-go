import { GoogleService } from '../../../../core/services/google.service';
import { FoursquareService } from '../../../../core/services/foursquare.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {
  LoadRequestAction,
  ActionTypes,
  LoadCompleteAction
} from '../actions/venues';

@Injectable()
export class VenuesStoreEffects {
  constructor(
    private actions$: Actions,
    private foursquareService: FoursquareService,
    private googleService: GoogleService
  ) {}

  // @Effect()
  // loadAllVenues$ = this.actions$.pipe(
  //   ofType<LoadRequestAction>(ActionTypes.LOAD_REQUEST),
  //   mergeMap(() => this.foursquareService.getVenueRecommendations()),
  //   map(items => new LoadCompleteAction({ items }))
  // );

  // @Effect()
  // loadVenuesCompleted$ = this.actions$.pipe(
  //   ofType<LoadCompleteAction>(ActionTypes.LOAD_COMPLETE),
  //   mergeMap((venues) => this.googleService.getPlacePhotosUrls(venues.payload.items)),
  //   map(items => new LoadCompleteAction({ items }))
  // );
}
