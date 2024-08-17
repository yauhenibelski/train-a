import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STATIONS_FEATURE, stationsAdapter, StationsState } from './stations.state';

const { selectAll, selectEntities } = stationsAdapter.getSelectors();
const stationsFeature = createFeatureSelector<StationsState>(STATIONS_FEATURE);

export const selectAllStations = createSelector(stationsFeature, state => selectAll(state));
export const selectStationsEntities = createSelector(stationsFeature, state =>
    selectEntities(state),
);
