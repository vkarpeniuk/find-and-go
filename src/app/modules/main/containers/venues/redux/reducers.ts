import { Venue, VenuePhoto } from '@models';
import { Actions, ActionTypes } from './actions';

export interface State {
  venues: Venue[];
  venuesPhotos: VenuePhoto[];
  focusedVenueId: string;
  scrolledVenueId: string;
  isLoading: boolean;
}

export const initialState: State = {
  venues: [],
  venuesPhotos: [],
  focusedVenueId: null,
  scrolledVenueId: null,
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
        venues: action.payload.items
      };
    }
    case ActionTypes.LOAD_PHOTOS_COMPLETE: {
      return {
        ...state,
        venuesPhotos: action.payload.venuesPhotos,
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
    case ActionTypes.SCROLL_TO_VENUE: {
      return {
        ...state,
        scrolledVenueId: action.payload.id
      };
    }
    case ActionTypes.RESET_SCROLLED_VENUE: {
      return {
        ...state,
        scrolledVenueId: null
      };
    }
    default: {
      return state;
    }
  }
}
