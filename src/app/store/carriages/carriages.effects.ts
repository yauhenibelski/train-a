import { CarriageList } from '@type/carriage-list.type';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, EMPTY, map } from 'rxjs';
import { CarriagesActions } from './carriages.actions';

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
    (actions$ = inject(Actions), httpClient = inject(HttpClient)) =>
        actions$.pipe(
            ofType(CarriagesActions.loadAll),
            concatMap(() => httpClient.get<CarriageList>('/api/carriage')),
            map(carriages => {
                return carriages.map(carriage => ({
                    ...carriage,
                    seatingMatrix: createSeatingMatrix(
                        carriage.rows,
                        carriage.leftSeats,
                        carriage.rightSeats,
                    ),
                }));
            }),
            map(carriages => CarriagesActions.setAll(carriages)),
            catchError(() => EMPTY),
        ),
    { functional: true, dispatch: true },
);
