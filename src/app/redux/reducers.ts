import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { GlobalState, globalReducer } from './global-reducer';
import * as fromFilters from '../modules/main/containers/header/redux/reducers';
import * as fromVenues from '../modules/main/containers/venues/redux/reducers';
import * as fromVenueDetails from '../modules/venue-details/containers/details/redux/reducers';
import { RouterState } from './router-state';

export interface State {
  filters: fromFilters.State;
  venues: fromVenues.State;
  venueDetails: fromVenueDetails.State;
  router: RouterReducerState<RouterState>;
  global: GlobalState;
}

export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  venues: fromVenues.reducer,
  venueDetails: fromVenueDetails.reducer,
  router: routerReducer,
  global: globalReducer
};
