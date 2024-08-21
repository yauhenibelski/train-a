import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StationsActions } from '@store/stations/stations.actions';
import { CommonModule } from '@angular/common';
import { selectAllCarriages } from '@store/carriages/carriages.selector';
import { selectAllStations } from '@store/stations/stations.selectors';
import { StationsPageComponent } from './stations-page/stations-page.component';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    imports: [CommonModule, StationsPageComponent],
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {
    constructor(private readonly store: Store) {
        this.store.dispatch(StationsActions.loadAll());
    }

    ngOnInit(): void {
        this.logCarriagesFromStore();
    }

    private logCarriagesFromStore(): void {
        this.store.select(selectAllCarriages).subscribe(entities => {
            console.info('Current carriages on stations page in store:', entities);
        });
        this.store.select(selectAllStations).subscribe(entities => {
            console.info('Current stations in store:', entities);
        });
    }
}
