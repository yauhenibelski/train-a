import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MapOptions, tileLayer, latLng, LeafletMouseEvent } from 'leaflet';
import { StationList } from '@type/station-list.type';
import { ToMarkerPipe } from '../../pipe/to-marker/to-marker.pipe';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [LeafletModule, ToMarkerPipe],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
    readonly stationList = input<StationList>();

    readonly leafletClick = output<LeafletMouseEvent>();

    readonly options: MapOptions = {
        layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })],
        zoom: 5,
        center: latLng(52.643, 23.7304),
    };
}
