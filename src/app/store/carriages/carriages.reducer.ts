import { createReducer, on } from '@ngrx/store';
import { carriagesAdapter, carriagesInitialState } from './carriages.state';
import { CarriagesActions } from './carriages.actions';

export const carriageReducer = createReducer(
    carriagesInitialState,
    on(CarriagesActions.setAll, (state, { carriages }) =>
        carriagesAdapter.setAll(carriages, state),
    ),
    on(CarriagesActions.addOne, (state, carriage) => carriagesAdapter.addOne(carriage, state)),
    on(CarriagesActions.removeOne, (state, { code }) => carriagesAdapter.removeOne(code, state)),
);
