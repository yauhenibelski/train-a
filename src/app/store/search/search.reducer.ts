import { createReducer, on } from '@ngrx/store';
import { SearchActions } from './search.actions';
import { searchInitialState } from './search.state';

export const searchReducer = createReducer(
    searchInitialState,
    on(SearchActions.setAll, (state, { searchStations }) => ({ ...state, searchStations })),
    on(SearchActions.setSearch, (state, { search }) => ({ ...state, search })),
);
