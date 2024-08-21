import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage, RotatedSeat } from '@interface/carriage.interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { CarriagesActions } from '@store/carriages/carriages.actions';
import { selectAllCarriages } from '@store/carriages/carriages.selector';
import { selectAllStations } from '@store/stations/stations.selectors';
import { CarriageService } from './services/carriage.service';
import { SeatComponent } from './seat/seat.component';

@Component({
    selector: 'app-carriages-page',
    standalone: true,
    templateUrl: './carriages-page.component.html',
    styleUrls: ['./carriages-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SeatComponent, NgFor, NgIf, CommonModule],
})
export class CarriagesPageComponent implements OnInit {
    carriages$: Observable<Carriage[]> = this.carriageService.getCarriages();
    rotatedSeatingMatrices: { [key: string]: RotatedSeat[][] } = {};

    constructor(
        private readonly carriageService: CarriageService,
        private readonly store: Store,
    ) {}

    ngOnInit(): void {
        this.loadCarriages();
        this.logCarriagesFromStore(); // Вывод состояния carriages при инициализации
    }

    private loadCarriages(): void {
        this.carriageService.loadCarriages();

        this.carriages$.subscribe(carriages => {
            carriages.forEach(carriage => {
                if (carriage.seatingMatrix && carriage.seatingMatrix.length) {
                    const rotatedMatrix = this.carriageService.rotateSeatingMatrix(
                        carriage.seatingMatrix,
                    );

                    this.rotatedSeatingMatrices[carriage.name] = rotatedMatrix;
                }
            });
        });
    }

    private logCarriagesFromStore(): void {
        this.store.select(selectAllCarriages).subscribe(entities => {
            console.info('Current carriages on stations page in store:', entities);
        });
        this.store.select(selectAllStations).subscribe(entities => {
            console.info('Current stations in store:', entities);
        });
    }

    onSeatClick(code: string, rowIndex: number, columnIndex: number): void {
        this.store.dispatch(CarriagesActions.toggleSeat(code, rowIndex, columnIndex));
        console.info(
            `Toggled seat at row: ${rowIndex}, column: ${columnIndex} for carriage code: ${code}`,
        );
    }
}
