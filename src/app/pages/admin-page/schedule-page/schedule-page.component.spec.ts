import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulePageComponent } from './schedule-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ScheduleService } from './service/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { By, Title } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '@shared/components/confirm-delete/confirm-delete.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { RideComponent } from './ride/ride.component';

@Component({
    selector: 'app-ride',
    standalone: true,
    template: '<div></div>',
    inputs: ['path', 'ride'],
})
class MockRideComponent {}

describe('SchedulePageComponent', () => {
    let fixture: ComponentFixture<SchedulePageComponent>;
    let scheduleService: ScheduleService;
    let component: SchedulePageComponent;
    let matDialog = {
        open: () => ({
            afterClosed: () => of<boolean | null>(true),
            afterOpened: () => of(null),
        }),
    };

    const routeId = 28;

    beforeEach(async () => {
        const testBet = TestBed.configureTestingModule({
            imports: [SchedulePageComponent, NoopAnimationsModule],
            providers: [
                provideMockStore(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: () => routeId,
                        }),
                    },
                },
                {
                    provide: MatDialog,
                    useValue: matDialog,
                },
            ],
        });

        testBet.overrideComponent(SchedulePageComponent, {
            remove: { imports: [RideComponent] },
            add: { imports: [MockRideComponent] },
        });

        testBet.overrideProvider(ScheduleService, {
            useValue: {
                removeById: () => {},
                loadSchedule: () => {},
                updateRide: () => of(null),
                createRide: () => of(null),
                carriages$: of(getRide().carriages),
                schedule$: of(getRide().schedule),
                path$: of(getRide().path),
                id: getRide().id,
            },
        });

        await testBet.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SchedulePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        scheduleService = TestBed.inject(ScheduleService);
    });

    it('should set title', () => {
        const title = TestBed.inject(Title);

        fixture.componentRef.setInput('id', routeId);

        expect(title.getTitle()).toBe(`Route №${routeId}`);
    });

    test('should add save btn', () => {
        let saveBtn: DebugElement;

        saveBtn = fixture.debugElement.query(By.css('[test-id="save-btn"]'));
        expect(saveBtn).toBeNull();

        component.addSaveBtn(0, getRide().schedule[0]);

        saveBtn = fixture.debugElement.query(By.css('[test-id="save-btn"]'));
        expect(saveBtn).toBeDefined();
    });

    test('should contain CreateRideComponent', () => {
        const createRide = fixture.debugElement.query(By.css('app-create-ride'));
        expect(createRide).toBeDefined();
    });

    test('should hide saveBtn ', () => {
        let saveBtn: DebugElement;

        component.addSaveBtn(1, getRide().schedule[0]);
        saveBtn = fixture.debugElement.query(By.css('[test-id="save-btn"]'));
        expect(saveBtn).toBeDefined();

        component.hideSaveBtn(1);
        saveBtn = fixture.debugElement.query(By.css('[test-id="save-btn"]'));
        expect(saveBtn).toBeNull();
    });

    test('should call scheduleService.updateRide', () => {
        const spy = jest.spyOn(scheduleService, 'updateRide');
        const ride = getRide().schedule[0];
        const { rideId, segments } = ride;

        component.save(ride);

        expect(spy).toHaveBeenCalledWith(rideId, segments);
    });

    test('should call scheduleService.createRide', () => {
        const spy = jest.spyOn(scheduleService, 'createRide');
        const { segments } = getRide().schedule[0];

        component.createRide(segments);

        expect(spy).toHaveBeenCalledWith(segments);
    });

    test('should open matDialog with ConfirmDeleteComponent', () => {
        const spy = jest.spyOn(matDialog, 'open');
        component.remove(routeId);

        expect(spy).toHaveBeenCalledWith(ConfirmDeleteComponent);
    });

    test('should call scheduleService.removeById', () => {
        const spy = jest.spyOn(scheduleService, 'removeById');
        component.remove(routeId);

        expect(spy).toHaveBeenCalledWith(routeId);
    });

    test('should contain app-ride when mat-expansion-panel expanded', () => {
        const debugElement = fixture.debugElement.query(By.css('[test-id="mat-expansion-panel"]'));
        const matExpansionPanel = debugElement.componentInstance as MatExpansionPanel;

        let ride: DebugElement;

        ride = fixture.debugElement.query(By.css('app-ride'));
        expect(ride).toBeTruthy();

        matExpansionPanel.close();
        fixture.detectChanges();

        ride = fixture.debugElement.query(By.css('app-ride'));
        expect(ride).toBeFalsy();
    });
});

function getRide() {
    return {
        id: 28,
        path: [69, 2, 4],
        carriages: ['carriage1', 'carriage2', 'carriage3', 'carriage4'],
        schedule: [
            {
                rideId: 103,
                segments: [
                    {
                        time: ['2024-08-15T13:27:10.000Z', '2024-08-17T16:58:10.804Z'],
                        price: {
                            carriage2: 266,
                            carriage4: 1787,
                            carriage1: 1104,
                            carriage3: 1476,
                        },
                    },
                    {
                        time: ['2024-08-17T17:33:10.804Z', '2024-08-18T09:50:10.804Z'],
                        price: { carriage2: 225, carriage4: 659, carriage1: 568, carriage3: 893 },
                    },
                    {
                        time: ['2024-08-18T10:08:10.804Z', '2024-08-19T17:28:10.804Z'],
                        price: {
                            carriage2: 1250,
                            carriage4: 2316,
                            carriage1: 589,
                            carriage3: 1080,
                        },
                    },
                ],
            },
        ],
    };
}
