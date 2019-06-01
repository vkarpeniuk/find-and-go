import { Actions, ActionTypes } from './actions';

export interface State {
  search: string;
  where: string;
  latitude: number;
  longitude: number;
  zoom: number;
  locationByMap: boolean;
}

export const initialState: State = {
  search: null,
  where: null,
  latitude: 48.9226,
  longitude: 24.7111,
  zoom: 8,
  locationByMap: true
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.CHANGE_SEARCH: {
      return {
        ...state,
        search: action.payload.search
      };
    }
    case ActionTypes.CHANGE_WHERE: {
      return {
        ...state,
        where: action.payload.where,
        locationByMap: false
      };
    }
    case ActionTypes.CHANGE_MAP_LOCATION: {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        locationByMap: true
      };
    }
    default: {
      return state;
    }
  }
}
