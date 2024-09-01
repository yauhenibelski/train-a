import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-order-confirm-delete',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
    templateUrl: './order-confirm-delete.component.html',
    styleUrls: ['./order-confirm-delete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmDeleteComponent {
    constructor(
        public dialogRef: MatDialogRef<OrderConfirmDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { orderId: number; customerName: string },
    ) {}
}
