import { Venue } from '@models';
import { Actions, ActionTypes } from './actions';

export interface State {
  venues: Venue[];
  focusedVenueId: string;
  isLoading: boolean;
}

export const initialState: State = {
  venues: [],
  focusedVenueId: null,
  isLoading: false
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ActionTypes.LOAD_COMPLETE: {
      return {
        ...state,
        venues: action.payload.items,
        isLoading: false
      };
    }
    case ActionTypes.VENUE_FOCUSED: {
      return {
        ...state,
        focusedVenueId: action.payload.id
      };
    }
    case ActionTypes.VENUES_UNFOCUSED: {
      return {
        ...state,
        focusedVenueId: null
      };
    }
    default: {
      return state;
    }
  }
}
