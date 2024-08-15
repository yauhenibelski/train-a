import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StationsPageComponent } from './stations-page/stations-page.component';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    imports: [StationsPageComponent],
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {}
