import { createFeatureSelector } from '@ngrx/store';
import { State } from '@reducers*';

export const selectVenueDetailsState = createFeatureSelector<State>(
  'venueDetails'
);
