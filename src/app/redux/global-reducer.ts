import { HttpErrorResponse } from '@angular/common/http';

import { Actions, ActionTypes } from '@actions*';

export interface GlobalState {
  error: HttpErrorResponse;
}

export const initialState: GlobalState = {
  error: null
};

export function globalReducer(
  state = initialState,
  action: Actions
): GlobalState {
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
