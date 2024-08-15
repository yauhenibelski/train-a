import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllStations, selectStationsEntities } from '@store/stations/stations.selectors';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from './map/map.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationConnectorComponent } from './station-connector/station-connector.component';
import { ConnectStationService } from './services/connect-station/connect-station.service';

@Component({
    selector: 'app-stations-page',
    standalone: true,
    imports: [MapComponent, StationListComponent, StationConnectorComponent, MatCardModule],
    templateUrl: './stations-page.component.html',
    styleUrl: './stations-page.component.scss',
    providers: [ConnectStationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
    readonly stations = toSignal(this.store.select(selectAllStations));
    readonly stationEntities = toSignal(this.store.select(selectStationsEntities));

    constructor(private readonly store: Store) {}
}
