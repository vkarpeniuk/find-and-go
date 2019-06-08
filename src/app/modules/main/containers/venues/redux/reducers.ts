import { Venue } from '@models';
import { Actions, ActionTypes } from './actions';

export interface State {
  venues: Venue[];
  isLoading: boolean;
}

export const initialState: State = {
  venues: [],
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
    default: {
      return state;
    }
  }
}
