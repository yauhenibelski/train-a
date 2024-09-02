import { Search, SearchStations } from '@interface/search.interface';
import { createActionGroup, props } from '@ngrx/store';
import { SearchForm } from '@type/search.type';

export const SearchActions = createActionGroup({
    source: 'Search',
    events: {
        'Load all': props<Search>(),
        'Set all': (searchStations: SearchStations) => ({ searchStations }),
        'Set search': (search: SearchForm) => ({ search }),
    },
});
