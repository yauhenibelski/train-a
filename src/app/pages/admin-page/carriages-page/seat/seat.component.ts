import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeatBackgroundDirective } from './directives/seat-background.directive';

@Component({
    selector: 'app-seat',
    standalone: true,
    imports: [SeatBackgroundDirective],
    templateUrl: './seat.component.html',
    styleUrl: './seat.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {
    @Input() value: string | number = 1;
    @Input() seatNumber = 1;
}
