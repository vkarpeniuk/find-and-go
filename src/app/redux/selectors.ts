import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterState, State, GlobalState } from './reducers';
import { Params } from '@angular/router';

export const selectRouterState = createFeatureSelector<
  RouterReducerState<RouterState>
>('router');

export const selectParams = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterState>): Params =>
    routerState.state.params
);

export const selectQueryParams = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterState>): Params =>
    routerState.state.queryParams
);

export const selectUrl = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterState>): string =>
    routerState.state.url
);

export const selectGlobalState = createFeatureSelector<GlobalState>('global');

export const selectError = createSelector(
  selectGlobalState,
  (state: GlobalState): string => state.error
);
