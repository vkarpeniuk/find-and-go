import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function filtersReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.CHANGE_SEARCH: {
      return {
        ...state,
        search: action.payload.newSearch
      };
    }
    case ActionTypes.CHANGE_WHERE: {
      return {
        ...state,
        where: action.payload.newWhere
      };
    }
    default: {
      return state;
    }
  }
}
