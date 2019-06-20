import { State } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectVenueDetailsState = createFeatureSelector<State>(
  'venueDetails'
);

export const selectPhotos = createSelector(
  selectVenueDetailsState,
  (state: State): string[] => state.venue.photos
);
