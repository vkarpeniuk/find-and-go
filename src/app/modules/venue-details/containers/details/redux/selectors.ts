import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VenueDetails, Tip } from '@models*';
import { State } from './reducers';

export const selectVenueDetailsState = createFeatureSelector<State>(
  'venueDetails'
);

export const selectVenue = createSelector(
  selectVenueDetailsState,
  (state: State): VenueDetails => state.venue
);

export const selectPhotos = createSelector(
  selectVenue,
  (venue: VenueDetails): string[] => venue.photos
);

export const selectTips = createSelector(
  selectVenue,
  (venue: VenueDetails): Tip[] => venue.tips
);

export const selectIsLoading = createSelector(
  selectVenueDetailsState,
  (state: State): boolean => state.isLoading
);
