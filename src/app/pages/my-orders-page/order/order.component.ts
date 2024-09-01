import { NgFor, CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Order } from '@interface/order.interface';
import { RideSegment } from '@interface/ride.interface';
import { UserList } from '@type/order.type';
import { Observable, tap, catchError, of } from 'rxjs';
import { OrdersService } from '@pages/my-orders-page/services/orders.service';
import { AuthService } from '@shared/service/auth/auth.service';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [NgFor, CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
    @Input() order!: Order;
    @Input() carriageMap: Record<string, number> = {};
    @Input() users: UserList = [];
    @Output() orderCanceled = new EventEmitter<number>();
    readonly authService = inject(AuthService);

    constructor(private readonly ordersService: OrdersService) {}

    getUserName(userId: number): string {
        const user = this.users.find(u => u.id === userId);

        return user ? user.name || user.email : ' ';
    }

    onCancelOrder(orderId: number): void {
        this.cancelOrder(orderId)
            .pipe(
                tap(() => {
                    this.orderCanceled.emit(orderId);
                }),
                catchError(() => {
                    return of(null);
                }),
            )
            .subscribe();
    }

    cancelOrder(orderId: number): Observable<Order> {
        return this.ordersService.cancelOrder(orderId);
    }

    getCarriageNumber(): number {
        return this.ordersService.getCarriageNumber(this.order, this.carriageMap);
    }

    getCarriageName(): string {
        return this.ordersService.getCarriageName(this.order, this.carriageMap);
    }

    calculateTotalPrice(segments: RideSegment[], typeOfCarriage: string): number {
        return this.ordersService.calculateTotalPrice(segments, typeOfCarriage);
    }

    calculateTripDuration(startTime: string, endTime: string): string {
        return this.ordersService.calculateTripDuration(startTime, endTime);
    }

    formatDate(dateString: string): string {
        return this.ordersService.formatDate(dateString);
    }
}
