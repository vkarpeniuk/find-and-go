import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';

export const selectFiltersState = createFeatureSelector<State>('filters');

export const selectSearchFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.search
);

export const selectWhereFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.where
);
