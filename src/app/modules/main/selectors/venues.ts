import { Venue } from './../../../core/models/venue.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../reducers/venues';

export const selectVenuesState = createFeatureSelector<State>('venues');

export const selectAllVenues: (state: object) => Venue[] = adapter.getSelectors(
  selectVenuesState
).selectAll;

export const selectVenueById = (id: string) =>
  createSelector(
    selectVenuesState,
    venueState => venueState.entities[id]
  );
