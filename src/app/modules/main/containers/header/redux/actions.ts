import { Action } from '@ngrx/store';
import { MapOptions } from 'src/app/core/models';

export enum ActionTypes {
  CHANGE_SEARCH = '[Header] Change search',
  CHANGE_WHERE = '[Header] Change where',
  CHANGE_MAP_LOCATION = '[Header] Change map location',
  GET_CURRENT_LOCATION = '[Header] Get current location'
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

export class GetCurrentLocationAction implements Action {
  readonly type = ActionTypes.GET_CURRENT_LOCATION;
  constructor() {}
}

export type Actions =
  | ChangeSearchAction
  | ChangeWhereAction
  | ChangeMapLocationAction
  | GetCurrentLocationAction;
