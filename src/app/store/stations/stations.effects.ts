import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { StationList } from '@type/station.type';
import { StationsActions } from './stations.actions';

export const getAllStations = createEffect(
    (actions$ = inject(Actions), httpClient = inject(HttpClient)) =>
        actions$.pipe(
            ofType(StationsActions.loadAll),
            switchMap(() => httpClient.get<StationList>('/api/station')),
            map(stations => StationsActions.setAll(stations)),
            catchError(() => EMPTY),
        ),
    { functional: true, dispatch: true },
);

export const createStation = createEffect(
    (actions$ = inject(Actions), httpClient = inject(HttpClient)) =>
        actions$.pipe(
            ofType(StationsActions.createOne),
            switchMap(station => httpClient.post<{ id: number }>('/api/station', station)),
            map(() => StationsActions.loadAll()),
            catchError(() => EMPTY),
        ),
    { functional: true, dispatch: true },
);

export const removeStation = createEffect(
    (actions$ = inject(Actions), httpClient = inject(HttpClient)) =>
        actions$.pipe(
            ofType(StationsActions.removeOne),
            switchMap(({ id }) =>
                httpClient.delete<{ id: number }>(`/api/station/${id}`).pipe(
                    catchError(() => EMPTY),
                    map(() => StationsActions.removeOneSuccess(id)),
                ),
            ),
        ),
    { functional: true, dispatch: true },
);
