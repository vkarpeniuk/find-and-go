import { MapOptions } from './../../../../core/models/map-options.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFilters from '../reducers/filters';

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
  (state: fromFilters.State): MapOptions => {
    return {
      latitude: state.latitude,
      longitude: state.longitude,
      zoom: state.zoom
    };
  }
);
