import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StationsActions } from '@store/stations/stations.actions';
import { selectAllStations } from '@store/stations/stations.selectors';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { StationsPageComponent } from './stations-page/stations-page.component';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    imports: [CommonModule, StationsPageComponent],
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
    readonly stations = toSignal(this.store.select(selectAllStations));

    constructor(private readonly store: Store) {
        this.store.dispatch(StationsActions.loadAll());
    }
}
