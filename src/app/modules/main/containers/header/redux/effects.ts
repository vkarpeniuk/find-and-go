import { ActionTypes } from './actions';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { LoadRequestAction } from '../../venues/redux/actions';

@Injectable()
export class HeaderStoreEffects {
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
