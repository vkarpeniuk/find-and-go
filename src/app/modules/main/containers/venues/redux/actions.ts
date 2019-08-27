import { Action } from '@ngrx/store';

import { Venue, VenuePhoto } from '@models';

export enum ActionTypes {
  LOAD_REQUEST = '[Venues] Load Request',
  LOAD_COMPLETE = '[Venues] Load Complete',
  LOAD_PHOTOS_COMPLETE = '[Venues] Load Photos Complete',
  VENUE_FOCUSED = '[Venues] Venue Focused',
  VENUES_UNFOCUSED = '[Venues] Venues Unfocused',
  RENAVIGATE = '[Venues] Renavigate',
  SCROLL_TO_VENUE = '[Venues] Scroll To Venue',
  RESET_SCROLLED_VENUE = '[Venues] Reset Scrolled Venue'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETE;
  constructor(public payload: { items: Venue[] }) {}
}

export class LoadPhotosCompleteAction implements Action {
  readonly type = ActionTypes.LOAD_PHOTOS_COMPLETE;
  constructor(public payload: { venuesPhotos: VenuePhoto[] }) {}
}

export class VenueFocusedAction implements Action {
  readonly type = ActionTypes.VENUE_FOCUSED;
  constructor(public payload: { id: string }) {}
}

export class VenuesUnfocusedAction implements Action {
  readonly type = ActionTypes.VENUES_UNFOCUSED;
}

export class RenavigateAction implements Action {
  readonly type = ActionTypes.RENAVIGATE;
}

export class ScrollToVenueAction implements Action {
  readonly type = ActionTypes.SCROLL_TO_VENUE;
  constructor(public payload: { id: string }) {}
}

export class ResetScrolledVenueAction implements Action {
  readonly type = ActionTypes.RESET_SCROLLED_VENUE;
}

export type Actions =
  | LoadRequestAction
  | LoadCompleteAction
  | LoadPhotosCompleteAction
  | VenueFocusedAction
  | VenuesUnfocusedAction
  | RenavigateAction
  | ScrollToVenueAction
  | ResetScrolledVenueAction;
