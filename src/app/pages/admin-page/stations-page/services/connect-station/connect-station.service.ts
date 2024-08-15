import { computed, Injectable, signal } from '@angular/core';
import { Station } from '@interface/station.interface';

type Mode = 'edit' | 'add';

@Injectable()
export class ConnectStationService {
    private readonly mode = signal<Mode>('add');
    private readonly selectedStationSignal = signal<Station | null>(null);

    readonly isEditMode = computed(() => this.mode() === 'edit');
    readonly selectedStation = computed(this.selectedStationSignal);

    toggleMode(): void {
        this.mode.set(this.mode() === 'edit' ? 'add' : 'edit');
        this.selectedStationSignal.set(null);
    }

    selectStation(station: Station): void {
        if (this.isEditMode()) {
            this.selectedStationSignal.set(station);
        }
    }
}
