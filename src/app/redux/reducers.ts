import { Params } from '@angular/router';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromFilters from '../modules/main/containers/header/redux/reducers';
import * as fromVenues from '../modules/main/containers/venues/redux/reducers';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  filters: fromFilters.State;
  venues: fromVenues.State;
  router: RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  venues: fromVenues.reducer,
  router: routerReducer
};
