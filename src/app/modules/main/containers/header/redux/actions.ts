import { Action } from '@ngrx/store';
import { MapOptions } from 'src/app/core/models';

export enum ActionTypes {
  CHANGE_SEARCH = '[Filters] Change search',
  CHANGE_WHERE = '[Filters] Change where',
  CHANGE_MAP_LOCATION = '[Filters] Change map location'
}

export class ChangeSearchAction implements Action {
  readonly type = ActionTypes.CHANGE_SEARCH;
  constructor(public payload: { search: string }) {}
}

export class ChangeWhereAction implements Action {
  readonly type = ActionTypes.CHANGE_WHERE;
  constructor(public payload: { where: string }) {}
}

export class ChangeMapLocationAction implements Action {
  readonly type = ActionTypes.CHANGE_MAP_LOCATION;
  constructor(public payload: MapOptions) {}
}

export type Actions =
  | ChangeSearchAction
  | ChangeWhereAction
  | ChangeMapLocationAction;
