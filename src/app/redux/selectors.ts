import { Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { GlobalState } from './global-reducer';
import { RouterState } from './router-state';

export const routerStateSelector = createFeatureSelector<
  RouterReducerState<RouterState>
>('router');

export const selectRouterState = createSelector(
  routerStateSelector,
  (routerState: RouterReducerState<RouterState>): RouterState =>
    routerState.state
);

export const selectParams = createSelector(
  selectRouterState,
  (routerState: RouterState): Params => routerState.params
);

export const selectQueryParams = createSelector(
  selectRouterState,
  (routerState: RouterState): Params => routerState.queryParams
);

export const selectUrl = createSelector(
  selectRouterState,
  (routerState: RouterState): string => routerState.url
);

export const selectParamsId = createSelector(
  selectParams,
  (params: Params): string => params.id
);

export const selectGlobalState = createFeatureSelector<GlobalState>('global');

export const selectError = createSelector(
  selectGlobalState,
  (state: GlobalState): HttpErrorResponse => state.error
);

export const selectErrorMessage = createSelector(
  selectError,
  (error: HttpErrorResponse): string => (error ? error.message : '')
);
