import { Action } from '@ngrx/store';
import { VenueDetails } from '@models';

export enum ActionTypes {
  LOAD_REQUEST = '[VenueDetails] Load Request',
  LOAD_COMPLETE = '[VenueDetails] Load Complete'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: { id: string }) {}
}

export class LoadCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETE;
  constructor(public payload: { venue: VenueDetails }) {}
}

export type Actions = LoadRequestAction | LoadCompleteAction;
