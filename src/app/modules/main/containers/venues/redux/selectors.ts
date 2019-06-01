import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './reducers';
import { Venue } from 'src/app/core/models';

export const selectVenuesState = createFeatureSelector<State>('venues');

export const selectAllVenues: (state: object) => Venue[] = adapter.getSelectors(
  selectVenuesState
).selectAll;

export const selectVenueById = (id: string) =>
  createSelector(
    selectVenuesState,
    venueState => venueState.entities[id]
  );
