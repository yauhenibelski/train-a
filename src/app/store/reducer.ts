import { stationReducer } from './stations/stations.reducer';
import { STATIONS_FEATURE } from './stations/stations.state';

export const storeReducer = {
    [STATIONS_FEATURE]: stationReducer,
} as const;
