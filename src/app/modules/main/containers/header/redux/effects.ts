import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { LocationService } from '@services';
import {
  ActionTypes,
  GetCurrentLocationAction,
  ChangeMapLocationAction
} from './actions';
import { LoadRequestAction } from '../../venues/redux/actions';

@Injectable()
export class HeaderStoreEffects {
  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) {}

  @Effect()
  changeFilters$ = this.actions$.pipe(
    ofType(
      ActionTypes.CHANGE_SEARCH,
      ActionTypes.CHANGE_WHERE,
      ActionTypes.CHANGE_MAP_LOCATION
    ),
    map(() => new LoadRequestAction())
  );

  @Effect()
  getCurrentLocation$ = this.actions$.pipe(
    ofType<GetCurrentLocationAction>(ActionTypes.GET_CURRENT_LOCATION),
    switchMap(() => this.locationService.getCurrentPosition()),
    map(
      res =>
        new ChangeMapLocationAction({
          latitude: res.latitude,
          longitude: res.longitude,
          zoom: 12
        })
    )
  );
}
