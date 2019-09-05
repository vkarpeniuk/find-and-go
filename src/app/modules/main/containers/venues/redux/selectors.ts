import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Venue } from '@models';
import { State } from './reducers';

export const selectVenuesState = createFeatureSelector<State>('venues');

export const selectAllVenues = createSelector(
  selectVenuesState,
  (state: State): Venue[] =>
    state.venues.map(venue => {
      return {
        ...venue,
        imageUrl: state.venuesPhotos[venue.id]
      };
    })
);

export const selectVenueById = createSelector(
  selectVenuesState,
  (state: State, id: string): Venue =>
    state.venues.find(venue => venue.id === id)
);

export const selectFocusedVenueId = createSelector(
  selectVenuesState,
  (state: State): string => state.focusedVenueId
);

export const selectIsLoading = createSelector(
  selectVenuesState,
  (state: State): boolean => state.isLoading
);

export const selectScrolledVenueIdx = createSelector(
  selectVenuesState,
  (state: State): number =>
    state.venues.findIndex(v => v.id === state.scrolledVenueId)
);
