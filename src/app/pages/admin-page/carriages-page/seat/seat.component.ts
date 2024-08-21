import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatBackgroundDirective } from './directives/seat-background.directive';

@Component({
    selector: 'app-seat',
    standalone: true,
    imports: [SeatBackgroundDirective],
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {
    @Input() value: string | number = 1;
    @Input() seatNumber = 1;
    @Output() seatClicked = new EventEmitter<number>();

    onSeatClick(): void {
        this.seatClicked.emit(this.seatNumber - 1);
    }
}
