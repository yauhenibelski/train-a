import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
    selector: 'app-my-orders-page',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        OrderComponent,
        OrderListComponent,
    ],
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersPageComponent {}
