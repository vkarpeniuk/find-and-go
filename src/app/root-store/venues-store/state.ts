import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Venue } from '../../models/venue';

export interface State extends EntityState<Venue> {}

export const adapter: EntityAdapter<Venue> = createEntityAdapter<Venue>();

export const initialState: State = adapter.getInitialState();
