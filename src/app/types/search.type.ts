import { Station } from '@interface/station.interface';

export type SearchForm = {
    startCity: string | Station;
    endCity: string | Station;
    date: string;
    time: string;
};

export type Geolocation = {
    latitude: number;
    longitude: number;
};

export type Segment = {
    time: [string, string];
    price: {
        [key: string]: number;
    };
    occupiedSeats: number[];
};

export type GetCurrentCities = { route1: number; route2: number };
