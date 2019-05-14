import { createSelector } from '@ngrx/store';
import { VenuesStoreSelectors } from './venues-store';
import { FiltersStoreSelectors } from './filters-store';
import { Venue } from '../models/venue';

export const selectAllVenues = createSelector(
  VenuesStoreSelectors.selectAllVenues,
  (venues: Venue[]) => {
    return venues;
  }
);

export const selectSearchFilter = createSelector(
  FiltersStoreSelectors.selectSearchFilter,
  (search: string) => {
    return search;
  }
);

export const selectWhereFilter = createSelector(
  FiltersStoreSelectors.selectWhereFilter,
  (where: string) => {
    return where;
  }
);
