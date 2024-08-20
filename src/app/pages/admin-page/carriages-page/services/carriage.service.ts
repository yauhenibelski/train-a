import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarriagesActions } from '@store/carriages/carriages.actions';
import { Observable } from 'rxjs';
import { selectAllCarriages } from '@store/carriages/carriages.selector';
import { Carriage, RotatedSeat, SeatingRow } from '@interface/carriage.interface';

@Injectable({
    providedIn: 'root',
})
export class CarriageService {
    constructor(private readonly store: Store) {}

    loadCarriages(): void {
        this.store.dispatch(CarriagesActions.loadAll());
    }

    getCarriages(): Observable<Carriage[]> {
        return this.store.select(selectAllCarriages);
    }

    rotateSeatingMatrix(matrix: SeatingRow[]): RotatedSeat[][] {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
        const rotatedMatrix: RotatedSeat[][] = Array.from({ length: numCols }, () => []);
        let seatCount = 0;

        for (let i = 0; i < numRows; i += 1) {
            for (let j = 0; j < numCols; j += 1) {
                const isFree = matrix[i][j];

                if (isFree !== '-') {
                    const originalIndex = seatCount;

                    rotatedMatrix[numCols - 1 - j][i] = {
                        seat_number: originalIndex,
                        isFree,
                    };
                    seatCount += 1;
                } else {
                    rotatedMatrix[numCols - 1 - j][i] = {
                        seat_number: -1,
                        isFree,
                    };
                }
            }
        }

        return rotatedMatrix;
    }
}
