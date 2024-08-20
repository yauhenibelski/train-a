import { carriageReducer } from './carriages/carriages.reducer';
import { CARRIAGES_FEATURE } from './carriages/carriages.state';
import { stationReducer } from './stations/stations.reducer';
import { STATIONS_FEATURE } from './stations/stations.state';

export const storeReducer = {
    [STATIONS_FEATURE]: stationReducer,
    [CARRIAGES_FEATURE]: carriageReducer,
} as const;
