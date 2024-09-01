import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CarriageActions } from '@store/carriages/carriages.actions';
import { selectAllCarriages } from '@store/carriages/carriages.selectors';
import { Carriages } from '@type/carriages.type';
import { OrderList, UserList } from '@type/order.type';
import { OrdersService } from '@pages/my-orders-page/services/orders.service';
import { OrderComponent } from '../order/order.component';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [OrderComponent, NgIf, NgFor, CommonModule],
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit, OnDestroy {
    private readonly ordersSubject = new BehaviorSubject<OrderList>([]);
    orders$ = this.ordersSubject.asObservable();
    users: UserList = [];
    carriages$: Observable<Carriages>;
    carriageMap: Record<string, number> = {};

    constructor(
        private readonly ordersService: OrdersService,
        private readonly store: Store,
    ) {
        this.store.dispatch(CarriageActions.loadAll());
        this.carriages$ = this.store.select(selectAllCarriages);

        this.ordersService
            .fetchOrders()
            .pipe(tap(orders => this.ordersSubject.next(orders)))
            .subscribe();

        this.ordersService
            .fetchUsers()
            .pipe(
                tap(users => {
                    this.users = users;
                }),
            )
            .subscribe();

        /* this.ordersService
            .createOrder(9, 60, 70, 52)
            .pipe(
                tap(order => {
                    console.info(order);
                }),
            )
            .subscribe(); */
    }

    ngOnInit(): void {
        this.carriages$
            .pipe(
                tap(carriages => {
                    this.carriageMap = this.ordersService.createCarriageMap(carriages);
                }),
            )
            .subscribe();
    }

    onOrderCanceled(): void {
        this.ordersService
            .fetchOrders()
            .pipe(
                tap(orders => {
                    this.ordersSubject.next(orders);
                }),
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.ordersSubject.complete();
    }
}
