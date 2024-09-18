import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePageComponent } from './route-page.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('RoutePageComponent', () => {
    let component: RoutePageComponent;
    let fixture: ComponentFixture<RoutePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoutePageComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RoutePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
