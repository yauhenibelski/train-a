import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmDeleteComponent } from './order-confirm-delete.component';

describe('OrderConfirmDeleteComponent', () => {
    let component: OrderConfirmDeleteComponent;
    let fixture: ComponentFixture<OrderConfirmDeleteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderConfirmDeleteComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderConfirmDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
