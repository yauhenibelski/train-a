import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarMassageService {
    constructor(private readonly snackBar: MatSnackBar) {}

    open(massage: string, isError: boolean): void {
        this.snackBar.open(`${massage}`, undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: isError ? 'snack-bar-err' : 'snack-bar-success',
        });
    }
}
