import { CarriageList } from '@type/carriage-list.type';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, EMPTY, map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CarriagesActions } from './carriages.actions';
import { selectCarriagesEntities } from './carriages.selector';

const createSeatingMatrix = (
    rows: number,
    leftSeats: number,
    rightSeats: number,
): Array<Array<0 | 1 | '-'>> => {
    const matrix = [];

    for (let i = 0; i < rows; i += 1) {
        const row = new Array(leftSeats).fill(1).concat('-').concat(new Array(rightSeats).fill(1));

        matrix.push(row);
    }

    return matrix;
};

export const getAllCarriages = createEffect(
    (actions$ = inject(Actions), httpClient = inject(HttpClient), store = inject(Store)) =>
        actions$.pipe(
            ofType(CarriagesActions.loadAll),
            concatMap(() =>
                httpClient.get<CarriageList>('/api/carriage').pipe(
                    withLatestFrom(store.select(selectCarriagesEntities)),
                    map(([carriages, existingEntities]) => {
                        return carriages.map(carriage => {
                            const existingCarriage = existingEntities[carriage.code];

                            console.info('existingCarriage: ', existingCarriage);

                            return {
                                ...carriage,
                                seatingMatrix: existingCarriage
                                    ? existingCarriage.seatingMatrix
                                    : createSeatingMatrix(
                                          carriage.rows,
                                          carriage.leftSeats,
                                          carriage.rightSeats,
                                      ),
                            };
                        });
                    }),
                    map(carriages => CarriagesActions.setAll(carriages)),
                    catchError(() => EMPTY),
                ),
            ),
        ),
    { functional: true, dispatch: true },
);
