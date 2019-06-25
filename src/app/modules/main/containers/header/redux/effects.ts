import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { LocationService } from '@services';
import * as fromRoot from '@reducers';
import {
  ActionTypes,
  GetCurrentLocationAction,
  ChangeMapLocationAction
} from './actions';
import { LoadRequestAction } from '../../venues/redux/actions';

@Injectable()
export class HeaderStoreEffects {
  constructor(
    private router: Router,
    private store$: Store<fromRoot.State>,
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
    withLatestFrom(this.store$),
    map(([action, storeState]) => {
      if (storeState.router.state.url !== '/venues') {
        this.router.navigateByUrl('/venues');
      }

      return new LoadRequestAction();
    })
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
