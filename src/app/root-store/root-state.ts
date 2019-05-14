import { VenuesStoreState } from './venues-store';
import { FiltersStoreState } from './filters-store';

export interface State {
  venues: VenuesStoreState.State;
  filters: FiltersStoreState.State;
}
