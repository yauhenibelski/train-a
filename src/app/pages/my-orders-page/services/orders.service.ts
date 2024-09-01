import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Order } from '@interface/order.interface';
import { OrderList, UserList } from '@type/order.type';
import { Carriages } from '@type/carriages.type';
import { RideSegment } from '@interface/ride.interface';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private readonly ordersApiUrl = '/api/order';
    private readonly usersApiUrl = '/api/users';

    constructor(private readonly http: HttpClient) {}

    fetchOrders(all: boolean = true): Observable<OrderList> {
        return this.http.get<OrderList>(this.ordersApiUrl, { params: { all: String(all) } }).pipe(
            catchError((error: unknown) => {
                console.error('Error fetching orders:', error);

                return of([]);
            }),
        );
    }

    fetchUsers(): Observable<UserList> {
        return this.http.get<UserList>(this.usersApiUrl).pipe(
            catchError((error: unknown) => {
                console.error('Error fetching users:', error);

                return of([]);
            }),
        );
    }

    cancelOrder(orderId: number): Observable<Order> {
        return this.http.delete<Order>(`${this.ordersApiUrl}/${orderId}`);
    }

    createOrder(
        rideId: number,
        seat: number,
        stationStart: number,
        stationEnd: number,
    ): Observable<Order | null> {
        const orderData = { rideId, seat, stationStart, stationEnd };

        return this.http.post<Order>(this.ordersApiUrl, orderData).pipe(
            catchError((error: unknown) => {
                // Указание типа ошибки
                console.error('Error creating order:', error);

                return of(null);
            }),
        );
    }

    createCarriageMap(carriages: Carriages): Record<string, number> {
        return carriages.reduce(
            (map, carriage) => {
                const totalSeats = (carriage.leftSeats + carriage.rightSeats) * carriage.rows;

                map[carriage.name] = totalSeats;

                return map;
            },
            {} as Record<string, number>,
        );
    }

    getCarriageNumber(order: Order, carriageMap: Record<string, number>): number {
        let cumulativeSeats = 0;

        for (let i = 0; i < order.carriages.length; i += 1) {
            const carriageName = order.carriages[i];
            const count = carriageMap[carriageName];

            cumulativeSeats += count;

            if (order.seatId <= cumulativeSeats) {
                return i + 1;
            }
        }

        return -1;
    }

    getCarriageName(order: Order, carriageMap: Record<string, number>): string {
        let cumulativeSeats = 0;

        for (let i = 0; i < order.carriages.length; i += 1) {
            const carriageName = order.carriages[i];
            const count = carriageMap[carriageName];

            cumulativeSeats += count;

            if (order.seatId <= cumulativeSeats) {
                return carriageName;
            }
        }

        return '';
    }

    calculateTotalPrice(segments: RideSegment[], typeOfCarriage: string): number {
        return segments.reduce((acc, segment) => {
            const price = segment.price[typeOfCarriage] || 0;

            return acc + price;
        }, 0);
    }

    calculateTripDuration(startTime: string, endTime: string): string {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const differenceInMinutes = Math.floor(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60),
        );

        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;

        return `${hours}h ${minutes}m`;
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month} ${day}, ${hours}:${minutes}`;
    }
}
