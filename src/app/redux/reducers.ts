import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { GlobalState, globalReducer } from './global-reducer';
import { reducers as filterReducers } from '../modules/main/containers/header/redux';
import { reducers as venueReducers } from '../modules/main/containers/venues/redux';
import { reducers as venueDetailsReducers } from '../modules/venue-details/containers/details/redux';
import { RouterState } from './router-state';

export interface State {
  filters: filterReducers.State;
  venues: venueReducers.State;
  venueDetails: venueDetailsReducers.State;
  router: RouterReducerState<RouterState>;
  global: GlobalState;
}

export const reducers: ActionReducerMap<State> = {
  filters: filterReducers.reducer,
  venues: venueReducers.reducer,
  venueDetails: venueDetailsReducers.reducer,
  router: routerReducer,
  global: globalReducer
};
