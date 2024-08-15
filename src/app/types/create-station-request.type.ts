import { Station } from '@interface/station.interface';

export type StationRequest = Omit<Station, 'connectedTo'> & { relations: number[] };
