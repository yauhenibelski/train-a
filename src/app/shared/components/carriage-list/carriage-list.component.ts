import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarriageActions } from '@store/carriages/carriages.actions';
import { selectAllCarriages } from '@store/carriages/carriages.selector';
import { Carriages } from '@type/carriages.type';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { CarriageComponent } from '../carriage/carriage.component';

@Component({
    selector: 'app-carriage-list',
    standalone: true,
    imports: [CarriageComponent, NgFor, CommonModule],
    templateUrl: './carriage-list.component.html',
    styleUrls: ['./carriage-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageListComponent implements OnInit {
    carriages$: Observable<Carriages>;

    constructor(private readonly store: Store) {
        this.carriages$ = this.store.select(selectAllCarriages);
    }

    ngOnInit() {
        this.store.dispatch(CarriageActions.loadAll());
    }
}
