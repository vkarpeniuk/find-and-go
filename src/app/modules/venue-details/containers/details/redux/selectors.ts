import { State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VenueDetails } from '@models*';

export const selectVenueDetailsState = createFeatureSelector<State>(
  'venueDetails'
);

export const selectVenue = createSelector(
  selectVenueDetailsState,
  (state: State): VenueDetails => state.venue
);

export const selectPhotos = createSelector(
  selectVenueDetailsState,
  (state: State): string[] => state.venue.photos
);

export const selectIsLoading = createSelector(
  selectVenueDetailsState,
  (state: State): boolean => state.isLoading
);
