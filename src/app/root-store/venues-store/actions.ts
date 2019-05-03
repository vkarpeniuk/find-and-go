import { Action } from '@ngrx/store';
import { Venue } from '../../models/venue';

export enum ActionTypes {
  LOAD_REQUEST = '[Venue] Load Request',
  LOAD_COMPLETE = '[Venue] Load Complete'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETE;
  constructor(public payload: { items: Venue[] }) {}
}

export type Actions = LoadRequestAction | LoadCompleteAction;
