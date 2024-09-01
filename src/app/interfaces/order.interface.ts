export interface RideSegment {
    time: string[];
    price: Record<string, number>;
}

export interface Ride {
    segments: RideSegment[];
}

export interface Order {
    id: number;
    path: number[];
    carriages: string[];
    routeId: number;
    seatId: number;
    rideId: number;
    schedule: Ride;
    userId: number;
    status: string;
    stationEnd: number;
    stationStart: number;
}

export interface User {
    id: number;
    email: string;
    name: string | null;
    role: 'user' | 'manager';
}
