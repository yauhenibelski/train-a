import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
    selector: 'app-stations-page',
    standalone: true,
    imports: [MapComponent],
    templateUrl: './stations-page.component.html',
    styleUrl: './stations-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {}
