import { createSelector } from '@ngrx/store';
import { VenuesStoreSelectors } from './venues-store';
import { Venue } from '../models/venue';

export const selectAllVenues = createSelector(
  VenuesStoreSelectors.selectAllVenues,
  (venues: Venue[]) => {
    return venues;
  }
);
