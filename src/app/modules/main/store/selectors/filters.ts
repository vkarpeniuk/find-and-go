import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFilters from '../reducers/filters';
import { MapLocation } from 'src/app/core';

export const selectFiltersState = createFeatureSelector<fromFilters.State>(
  'filters'
);

export const selectSearchFilter = createSelector(
  selectFiltersState,
  (state: fromFilters.State): string => state.search
);

export const selectWhereFilter = createSelector(
  selectFiltersState,
  (state: fromFilters.State): string => state.where
);

export const selectLocationFilter = createSelector(
  selectFiltersState,
  (state: fromFilters.State): MapLocation => {
    return {
      latitude: state.latitude,
      longitude: state.longitude
    };
  }
);
