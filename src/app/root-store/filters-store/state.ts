export interface State {
  search: string;
  where: string;
}

export const initialState: State = {
  search: null,
  where: null
};
