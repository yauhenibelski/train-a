import { SearchStations } from '@interface/search.interface';
import { SearchForm } from '@type/search.type';

export const SEARCH_FEATURE = 'search';

export type SearchState = {
    searchStations?: SearchStations;
    search?: SearchForm;
};

export const searchInitialState: SearchState = {};
