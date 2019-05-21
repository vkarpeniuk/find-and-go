import { ActionReducerMap } from '@ngrx/store';
import * as fromFilters from './filters';
import * as fromVenues from './venues';

export interface State {
  filters: fromFilters.State;
  venues: fromVenues.State;
}

export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  venues: fromVenues.reducer
};
