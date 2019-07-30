import { Params } from '@angular/router';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as log from 'loglevel';

import * as fromFilters from '../modules/main/containers/header/redux/reducers';
import * as fromVenues from '../modules/main/containers/venues/redux/reducers';
import * as fromVenueDetails from '../modules/venue-details/containers/details/redux/reducers';
import { Actions, ActionTypes } from '@actions*';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface GlobalState {
  error: string;
}

export const initialState: GlobalState = {
  error: null
};

export interface State {
  filters: fromFilters.State;
  venues: fromVenues.State;
  venueDetails: fromVenueDetails.State;
  router: RouterReducerState<RouterState>;
  global: GlobalState;
}

export function reducer(state = initialState, action: Actions): GlobalState {
  switch (action.type) {
    case ActionTypes.APP_FAILURE: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default:
      return initialState;
  }
}

export function loggerMetaReducer(
  actionReducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    if (action.type.endsWith('Failure')) {
      log.error('action', action);
    } else {
      log.info('action', action);
    }

    return actionReducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  venues: fromVenues.reducer,
  venueDetails: fromVenueDetails.reducer,
  router: routerReducer,
  global: reducer
};
