import { ActionReducerMap } from '@ngrx/store';
import * as fromFilters from '../modules/main/containers/header/redux/reducers';
import * as fromVenues from '../modules/main/containers/venues/redux/reducers';

export interface State {
  filters: fromFilters.State;
  venues: fromVenues.State;
}

export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  venues: fromVenues.reducer
};
