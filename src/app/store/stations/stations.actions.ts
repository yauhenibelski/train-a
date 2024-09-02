import { Station } from '@interface/station.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StationList, StationRequest } from '@type/station.type';

export const StationsActions = createActionGroup({
    source: 'Station',
    events: {
        'Load all': emptyProps(),
        'Set all': (stations: StationList) => ({ stations }),
        'Add one': props<Station>(),
        'Create one': props<StationRequest>(),
        'Remove one': (id: number) => ({ id }),
        'Remove one success': (id: number) => ({ id }),
    },
});
