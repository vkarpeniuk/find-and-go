import { State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VenueDetails, Tip } from '@models*';

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

export const selectTips = createSelector(
  selectVenueDetailsState,
  (state: State): Tip[] => state.venue.tips
);

export const selectIsLoading = createSelector(
  selectVenueDetailsState,
  (state: State): boolean => state.isLoading
);
