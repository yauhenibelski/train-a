import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage, RotatedSeat } from '@interface/carriage.interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
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

    constructor(private readonly carriageService: CarriageService) {}

    ngOnInit(): void {
        this.loadCarriages();
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
}
