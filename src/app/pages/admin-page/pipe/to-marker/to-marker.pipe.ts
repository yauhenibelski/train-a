import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '@interface/station.interface';
import { Marker, marker, icon, Icon } from 'leaflet';

@Pipe({
    name: 'toMarker',
    standalone: true,
})
export class ToMarkerPipe implements PipeTransform {
    transform({ city, latitude, longitude }: Station): Marker {
        return marker([latitude, longitude], {
            icon: icon({
                ...Icon.Default.prototype.options,
                iconUrl: 'assets/marker-icon.png',
                iconRetinaUrl: 'assets/marker-icon-2x.png',
                shadowUrl: 'assets/marker-shadow.png',
            }),
        }).bindPopup(city);
    }
}
