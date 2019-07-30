import { Action } from '@ngrx/store';

export enum ActionTypes {
  APP_FAILURE = '[Global] App Failure'
}

export class AppFailureAction implements Action {
  readonly type = ActionTypes.APP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions = AppFailureAction;
