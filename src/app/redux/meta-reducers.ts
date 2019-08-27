import { ActionReducer } from '@ngrx/store';
import * as log from 'loglevel';

export function loggerMetaReducer(
  actionReducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    if (action.type.toLowerCase().endsWith('failure')) {
      log.error('action', action);
    } else {
      log.info('action', action);
    }

    return actionReducer(state, action);
  };
}
