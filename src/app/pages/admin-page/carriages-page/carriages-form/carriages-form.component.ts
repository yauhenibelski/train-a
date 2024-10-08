import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarriageComponent } from '@shared/components/carriage/carriage.component';
import { HttpClient } from '@angular/common/http';
import { CarriageActions } from '@store/carriages/carriages.actions';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take } from 'rxjs';
import { selectAllCarriages } from '@store/carriages/carriages.selectors';
import { Carriage } from '@interface/carriage.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarriageFormService } from './services/carriage-form.service';

@Component({
    selector: 'app-carriages-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        CarriageComponent,
        MatButtonModule,
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './carriages-form.component.html',
    styleUrls: ['./carriages-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesFormComponent {
    carriageForm: FormGroup;
    carriages$!: Observable<Carriage[]>;
    isCreate$!: Observable<boolean>;
    isEdit$!: Observable<boolean>;
    nameExists = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly store: Store,
        private readonly carriageFormService: CarriageFormService,
    ) {
        this.carriageForm = this.fb.group({
            name: ['', Validators.required],
            rows: [1, [Validators.required, Validators.min(1), Validators.max(200)]],
            leftSeats: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
            rightSeats: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
        });

        this.carriages$ = this.store.select(selectAllCarriages);
        this.isEdit$ = this.carriageFormService.isEditForm$;
        this.isCreate$ = this.carriageFormService.isCreateForm$;

        this.carriageFormService.carriageData$.subscribe(data => {
            this.carriageForm.patchValue(data);
        });

        this.carriageForm.get('name')?.valueChanges.subscribe(() => {
            this.nameExists = false;
        });
    }

    async onSave() {
        const formData = this.carriageForm.value;

        if (this.carriageForm.valid) {
            combineLatest([this.isCreate$, this.isEdit$, this.carriages$])
                .pipe(
                    take(1),
                    map(([isCreate, isEdit, carriages]) => ({ isCreate, isEdit, carriages })),
                )
                .subscribe(({ isCreate, isEdit, carriages }) => {
                    this.nameExists = carriages.some(carriage => carriage.name === formData.name);

                    if (isCreate) {
                        if (!this.nameExists) {
                            const carriageData = {
                                ...formData,
                                code: this.carriageFormService.generateCode(formData.name),
                            };

                            this.store.dispatch(CarriageActions.addOne(carriageData));
                            this.closeWindow();
                        }
                    } else if (isEdit) {
                        const carriageData = {
                            ...formData,
                            code: this.carriageFormService.getCode(),
                        };

                        this.store.dispatch(
                            CarriageActions.updateOne(carriageData.code, carriageData),
                        );
                        this.closeWindow();
                    }
                });
        }
    }

    closeWindow() {
        this.carriageFormService.closeWindow();
    }
}
