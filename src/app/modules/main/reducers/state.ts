import { State as filtersState } from './filters';
import { State as venuesState } from './venues';

export interface State {
  filters: filtersState;
  where: venuesState;
}
