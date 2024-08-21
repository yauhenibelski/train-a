import { Carriage } from '@interface/carriage.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CarriageList } from '@type/carriage-list.type';

export const CarriagesActions = createActionGroup({
    source: 'Carriage',
    events: {
        'Load all': emptyProps(),
        'Set all': (carriages: CarriageList) => ({ carriages }),
        'Add one': props<Carriage>(),
        'Remove one': (code: string) => ({ code }),
        'Toggle seat': (code: string, rowIndex: number, columnIndex: number) => ({
            code,
            rowIndex,
            columnIndex,
        }),
    },
});
