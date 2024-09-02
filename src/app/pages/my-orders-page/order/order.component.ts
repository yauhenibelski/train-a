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
import { UserList } from '@type/order.type';
import { Observable, tap, catchError, of, switchMap } from 'rxjs';
import { OrdersService } from '@pages/my-orders-page/services/orders.service';
import { AuthService } from '@shared/service/auth/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderConfirmDeleteComponent } from '../order-confirm-delete/order-confirm-delete.component';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        NgFor,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
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

    constructor(
        private readonly ordersService: OrdersService,
        private readonly dialog: MatDialog,
        private readonly snackBar: MatSnackBar,
    ) {}

    getUserName(userId: number): string {
        const user = this.users.find(u => u.id === userId);

        return user ? user.name || user.email : ' ';
    }

    showSuccessMessage(): void {
        this.snackBar.open('Order successfully removed!', 'Close', {
            duration: 3000,
        });
    }

    onCancelOrder(orderId: number): void {
        const customerName = this.getUserName(this.order.userId);

        const dialogRef = this.dialog.open(OrderConfirmDeleteComponent, {
            data: {
                orderId,
                customerName,
            },
        });

        dialogRef
            .afterClosed()
            .pipe(
                switchMap(result => {
                    if (result) {
                        return this.cancelOrder(orderId).pipe(
                            tap(() => {
                                this.orderCanceled.emit(orderId);
                                this.showSuccessMessage();
                            }),
                        );
                    }

                    return of(null);
                }),
                catchError(() => of(null)),
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

    calculateTotalPrice(
        order: Order,
        startStation: number,
        endStation: number,
        typeOfCarriage: string,
    ): number {
        return this.ordersService.calculateTotalPrice(
            order,
            startStation,
            endStation,
            typeOfCarriage,
        );
    }

    calculateTripDuration(order: Order, startStation: number, endStation: number): string {
        return this.ordersService.calculateTripDuration(order, startStation, endStation);
    }

    getDate(order: Order, stationName: number, place: 'start' | 'end'): string {
        return this.ordersService.getDate(order, stationName, place);
    }
}
