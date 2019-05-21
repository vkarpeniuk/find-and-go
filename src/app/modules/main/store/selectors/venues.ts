import { Venue } from '../../../../core/models/venue.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVenues from '../reducers/venues';

export const selectVenuesState = createFeatureSelector<fromVenues.State>(
  'venues'
);

export const selectAllVenues: (
  state: object
) => Venue[] = fromVenues.adapter.getSelectors(selectVenuesState).selectAll;

export const selectVenueById = (id: string) =>
  createSelector(
    selectVenuesState,
    venueState => venueState.entities[id]
  );
