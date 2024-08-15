import { createReducer, on } from '@ngrx/store';
import { stationsAdapter, stationsInitialState } from './stations.state';
import { StationsActions } from './stations.actions';

export const stationReducer = createReducer(
    stationsInitialState,
    on(StationsActions.setAll, (state, { stations }) => stationsAdapter.setAll(stations, state)),
    on(StationsActions.addOne, (state, station) => stationsAdapter.addOne(station, state)),
    on(StationsActions.removeOne, (state, { id }) => stationsAdapter.removeOne(id, state)),
);
