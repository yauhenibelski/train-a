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
    on(CarriagesActions.toggleSeat, (state, { code, rowIndex, columnIndex }) => {
        const carriage = state.entities[code];

        if (carriage) {
            const updatedSeatingMatrix = carriage.seatingMatrix.map(row => [...row]);
            const currentSeat = updatedSeatingMatrix[rowIndex][columnIndex];

            updatedSeatingMatrix[rowIndex][columnIndex] = currentSeat === 0 ? 1 : 0;

            return carriagesAdapter.updateOne(
                { id: code, changes: { seatingMatrix: updatedSeatingMatrix } },
                state,
            );
        }

        return state;
    }),
);
