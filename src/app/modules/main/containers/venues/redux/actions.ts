import { Action } from '@ngrx/store';

import { Venue } from '@models';

export enum ActionTypes {
  LOAD_REQUEST = '[Venues] Load Request',
  LOAD_COMPLETE = '[Venues] Load Complete'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETE;
  constructor(public payload: { items: Venue[] }) {}
}

export type Actions = LoadRequestAction | LoadCompleteAction;
