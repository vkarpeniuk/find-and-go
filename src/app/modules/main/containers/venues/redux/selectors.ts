import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducers';
import { Venue } from '@models';

export const selectVenuesState = createFeatureSelector<State>('venues');

export const selectAllVenues = createSelector(
  selectVenuesState,
  (state: State): Venue[] => state.venues
);

export const selectVenueById = createSelector(
  selectVenuesState,
  (state: State, id: string): Venue =>
    state.venues.find(venue => venue.id === id)
);

export const selectIsLoading = createSelector(
  selectVenuesState,
  (state: State): boolean => state.isLoading
);
