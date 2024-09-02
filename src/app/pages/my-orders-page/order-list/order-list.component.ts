import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CarriageActions } from '@store/carriages/carriages.actions';
import { selectAllCarriages } from '@store/carriages/carriages.selectors';
import { Carriages } from '@type/carriages.type';
import { OrderList, UserList } from '@type/order.type';
import { OrdersService } from '@pages/my-orders-page/services/orders.service';
import { AuthService } from '@shared/service/auth/auth.service';
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
    private readonly subscriptions: Subscription = new Subscription();

    constructor(
        private readonly ordersService: OrdersService,
        private readonly store: Store,
        private readonly authService: AuthService,
    ) {
        this.store.dispatch(CarriageActions.loadAll());
        this.carriages$ = this.store.select(selectAllCarriages);

        const fetchOrdersSub = this.ordersService
            .fetchOrders()
            .pipe(tap(orders => this.ordersSubject.next(orders)))
            .subscribe();

        this.subscriptions.add(fetchOrdersSub);
    }

    ngOnInit(): void {
        const userTypeSub = this.authService.userType$
            .pipe(
                switchMap(userType => {
                    if (userType === 'admin') {
                        return this.ordersService.fetchUsers();
                    }

                    return of([]);
                }),
                tap(users => {
                    this.users = users;
                }),
            )
            .subscribe();

        this.subscriptions.add(userTypeSub);

        const carriagesSub = this.carriages$
            .pipe(
                tap(carriages => {
                    this.carriageMap = this.ordersService.createCarriageMap(carriages);
                }),
            )
            .subscribe();

        this.subscriptions.add(carriagesSub);
    }

    onOrderCanceled(): void {
        const fetchOrdersSub = this.ordersService
            .fetchOrders()
            .pipe(
                tap(orders => {
                    this.ordersSubject.next(orders);
                }),
            )
            .subscribe();

        this.subscriptions.add(fetchOrdersSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.ordersSubject.complete();
    }
}
