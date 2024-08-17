import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, EMPTY, map } from 'rxjs';
import { StationList } from '@type/station-list.type';
import { StationsActions } from './stations.actions';

export const getAllStations = createEffect(
    (actions$ = inject(Actions), httpClient = inject(HttpClient)) =>
        actions$.pipe(
            ofType(StationsActions.loadAll),
            concatMap(() => httpClient.get<StationList>('/api/station')),
            map(stations => StationsActions.setAll(stations)),
            catchError(() => EMPTY),
        ),
    { functional: true, dispatch: true },
);
