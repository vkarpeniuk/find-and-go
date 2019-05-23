import { ActionTypes } from './../actions/filters';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { LoadRequestAction } from '../actions/venues';

@Injectable()
export class FiltersStoreEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  changeFilters$ = this.actions$.pipe(
    ofType(
      ActionTypes.CHANGE_SEARCH,
      ActionTypes.CHANGE_WHERE,
      ActionTypes.CHANGE_MAP_LOCATION
    ),
    map(() => new LoadRequestAction())
  );
}
