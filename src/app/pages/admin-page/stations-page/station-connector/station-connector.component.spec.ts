import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationConnectorComponent } from './station-connector.component';

describe('StationConnectorComponent', () => {
    let component: StationConnectorComponent;
    let fixture: ComponentFixture<StationConnectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StationConnectorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StationConnectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
