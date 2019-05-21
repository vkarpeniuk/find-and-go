import { Actions, ActionTypes } from '../actions/filters';

export interface State {
  search: string;
  where: string;
}

export const initialState: State = {
  search: null,
  where: null
};

export function reducer(state = initialState, action: Actions): State {
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
