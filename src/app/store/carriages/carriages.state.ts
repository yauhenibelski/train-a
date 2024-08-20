import { Carriage } from '@interface/carriage.interface';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const CARRIAGES_FEATURE = 'carriages';

export type CarriagesState = EntityState<Carriage>;

export const carriagesAdapter = createEntityAdapter<Carriage>({
    selectId: (carriage: Carriage) => carriage.code,
});

export const carriagesInitialState = carriagesAdapter.getInitialState();
