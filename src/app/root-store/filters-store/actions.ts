import { Action } from '@ngrx/store';

export enum ActionTypes {
  CHANGE_SEARCH = '[Filters] Change search',
  CHANGE_WHERE = '[Filters] Change where'
}

export class ChangeSearchAction implements Action {
  readonly type = ActionTypes.CHANGE_SEARCH;
  constructor(public payload: { newSearch: string }) {}
}

export class ChangeWhereAction implements Action {
  readonly type = ActionTypes.CHANGE_WHERE;
  constructor(public payload: { newWhere: string }) {}
}

export type Actions = ChangeSearchAction | ChangeWhereAction;
