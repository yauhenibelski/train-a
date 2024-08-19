import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Carriage {
    code: string;
    name: string;
    rows: number;
    leftSeats: number;
    rightSeats: number;
}

@Component({
    selector: 'app-carriages-page',
    standalone: true,
    templateUrl: './carriages-page.component.html',
    styleUrls: ['./carriages-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})
export class CarriagesPageComponent implements OnInit {
    totalSeats!: number;
    carriages: Carriage[] = [];

    constructor(
        private readonly http: HttpClient,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.getCarriages();
    }

    getCarriages(): void {
        this.http.get<Carriage[]>('/api/carriage').subscribe({
            next: response => {
                this.carriages = response;
                this.totalSeats = response.reduce(
                    (sum, carriage) => sum + carriage.leftSeats + carriage.rightSeats,
                    0,
                );
                this.cdr.detectChanges();
            },
            error: (error: unknown) => {
                console.error('Ошибка при выполнении запроса', error);
                this.carriages = [];
                this.cdr.detectChanges();
            },
        });
    }

    getRows(rows: number): number[] {
        return Array.from({ length: rows }, (_, index) => index);
    }

    getRowSeats(seats: number): number[] {
        return Array.from({ length: seats }, (_, index) => index);
    }

    getSeatNumber(rowIndex: number, seatIndex: number): string {
        return `${(rowIndex + 1) * 10 + seatIndex + 1}`;
    }
}
