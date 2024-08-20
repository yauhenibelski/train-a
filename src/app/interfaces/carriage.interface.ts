export type SeatingRow = Array<0 | 1 | '-'>;

export interface Carriage {
    code: string;
    name: string;
    rows: number;
    leftSeats: number;
    rightSeats: number;
    seatingMatrix: SeatingRow[];
}

export interface RotatedSeat {
    seat_number: number;
    isFree: number | string;
}
