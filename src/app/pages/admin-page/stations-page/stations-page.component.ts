import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StationList } from '@type/station-list.type';
import { MapComponent } from './map/map.component';

@Component({
    selector: 'app-stations-page',
    standalone: true,
    imports: [MapComponent],
    templateUrl: './stations-page.component.html',
    styleUrl: './stations-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
    readonly stations = input<StationList>();
}
