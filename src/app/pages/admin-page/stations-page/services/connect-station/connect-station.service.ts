import { computed, Injectable, signal } from '@angular/core';
import { Station } from '@interface/station.interface';

@Injectable()
export class ConnectStationService {
    // private readonly mode = signal<Mode>('add');
    private readonly selectedStationSignal = signal<Station | null>(null);
    readonly pathLine = signal<number[][]>([[0, 0]]);

    // readonly isEditMode = computed(() => this.mode() === 'edit');
    readonly selectedStation = computed(this.selectedStationSignal);

    // toggleMode(): void {
    //     this.mode.set(this.mode() === 'edit' ? 'add' : 'edit');
    //     this.selectedStationSignal.set(null);
    // }

    selectStation(station: Station): void {
        this.selectedStationSignal.set(station);
    }
}
