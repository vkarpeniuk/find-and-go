import { Params } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterState, GlobalState } from './reducers';

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
  (state: GlobalState): string => state.error
);
