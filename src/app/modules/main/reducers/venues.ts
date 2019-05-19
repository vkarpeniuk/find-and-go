import { Venue } from './../../../core/models/venue.model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Actions, ActionTypes } from '../actions/venues';

export interface State extends EntityState<Venue> {}

export const adapter: EntityAdapter<Venue> = createEntityAdapter<Venue>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: Actions): State {
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
