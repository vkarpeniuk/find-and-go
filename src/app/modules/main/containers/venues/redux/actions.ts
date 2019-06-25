import { Action } from '@ngrx/store';

import { Venue } from '@models';

export enum ActionTypes {
  LOAD_REQUEST = '[Venues] Load Request',
  LOAD_COMPLETE = '[Venues] Load Complete',
  VENUE_FOCUSED = '[Venues] Venue Focused',
  VENUES_UNFOCUSED = '[Venues] Venues Unfocused'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETE;
  constructor(public payload: { items: Venue[] }) {}
}

export class VenueFocusedAction implements Action {
  readonly type = ActionTypes.VENUE_FOCUSED;
  constructor(public payload: { id: string }) {}
}

export class VenuesUnfocusedAction implements Action {
  readonly type = ActionTypes.VENUES_UNFOCUSED;
}

export type Actions =
  | LoadRequestAction
  | LoadCompleteAction
  | VenueFocusedAction
  | VenuesUnfocusedAction;
