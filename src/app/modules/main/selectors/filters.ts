import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/filters';

export const selectFiltersState = createFeatureSelector<State>('filters');

export const selectSearchFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.search
);

export const selectWhereFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.where
);
