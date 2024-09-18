import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationStepperComponent } from './station-stepper.component';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StationStepperComponent', () => {
    let component: StationStepperComponent;
    let fixture: ComponentFixture<StationStepperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StationStepperComponent, NoopAnimationsModule],
            providers: [provideMockStore()],
        }).compileComponents();

        fixture = TestBed.createComponent(StationStepperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
