import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllStations, selectStationsEntities } from '@store/stations/stations.selectors';
import { Store } from '@ngrx/store';
import { MapComponent } from './map/map.component';
import { StationListComponent } from './station-list/station-list.component';

@Component({
    selector: 'app-stations-page',
    standalone: true,
    imports: [MapComponent, StationListComponent],
    templateUrl: './stations-page.component.html',
    styleUrl: './stations-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
    readonly stations = toSignal(this.store.select(selectAllStations));
    readonly stationEntities = toSignal(this.store.select(selectStationsEntities));

    constructor(private readonly store: Store) {}
}
