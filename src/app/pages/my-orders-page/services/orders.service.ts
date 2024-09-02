import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Order } from '@interface/order.interface';
import { OrderList, UserList } from '@type/order.type';
import { Carriages } from '@type/carriages.type';

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

    calculateTotalPrice(
        order: Order,
        startStation: number,
        endStation: number,
        typeOfCarriage: string,
    ): number {
        const startStationIndex = order.path.indexOf(startStation);
        const endStationIndex = order.path.indexOf(endStation);
        const relevantSegments = order.schedule.segments.slice(startStationIndex, endStationIndex);

        return relevantSegments.reduce((acc, segment) => {
            const price = segment.price[typeOfCarriage] || 0;

            return acc + price;
        }, 0);
    }

    calculateTripDuration(order: Order, startStation: number, endStation: number): string {
        const startStationIndex = order.path.indexOf(startStation);
        const endStationIndex = order.path.indexOf(endStation) - 1;
        const startDate = new Date(order.schedule.segments[startStationIndex].time[0]);
        const endDate = new Date(order.schedule.segments[endStationIndex].time[1]);
        const differenceInMinutes = Math.floor(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60),
        );

        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;

        return `${hours}h ${minutes}m`;
    }

    getDate(order: Order, stationName: number, place: 'start' | 'end'): string {
        const stationIndex =
            place === 'start'
                ? order.path.indexOf(stationName)
                : order.path.indexOf(stationName) - 1;

        const date =
            place === 'start'
                ? new Date(order.schedule.segments[stationIndex].time[0])
                : new Date(order.schedule.segments[stationIndex].time[1]);

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
