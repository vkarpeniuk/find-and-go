import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducers';
import { MapOptions } from '@models';

export const selectFiltersState = createFeatureSelector<State>('filters');

export const selectSearchFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.search
);

export const selectWhereFilter = createSelector(
  selectFiltersState,
  (state: State): string => state.where
);

export const selectLocationFilter = createSelector(
  selectFiltersState,
  (state: State): MapOptions => {
    return {
      latitude: state.latitude,
      longitude: state.longitude,
      zoom: state.zoom
    };
  }
);
