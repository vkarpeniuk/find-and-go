import { VenueDetails } from '@models';
import { Actions, ActionTypes } from './actions';

export interface State {
  venue: VenueDetails;
  isLoading: boolean;
}

export const initialState: State = {
  venue: null,
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
        venue: action.payload.venue,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}
