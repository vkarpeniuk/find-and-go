import { Action } from '@ngrx/store';
export enum ActionTypes {
  SHOW_ERROR = '[Global] Show Error'
}

export class ShowErrorAction implements Action {
  readonly type = ActionTypes.SHOW_ERROR;
  constructor(public payload: { error: string }) {}
}

export type Actions = ShowErrorAction;
