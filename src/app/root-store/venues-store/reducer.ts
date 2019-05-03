import { Actions, ActionTypes } from './actions';
import { adapter, initialState, State } from './state';

export function venuesReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_COMPLETE: {
      return adapter.addAll(action.payload.items, {
        ...state
      });
    }
    default: {
      return state;
    }
  }
}
