import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, State } from './state';
import { Venue } from '../../models/venue';

export const selectVenuesState = createFeatureSelector<State>('venues');

export const selectAllVenues: (state: object) => Venue[] = adapter.getSelectors(
  selectVenuesState
).selectAll;

export const selectVenueById = (id: string) =>
  createSelector(
    selectVenuesState,
    venueState => venueState.entities[id]
  );
