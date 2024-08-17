import { TestBed } from '@angular/core/testing';

import { ConnectStationService } from './connect-station.service';

describe('ConnectStationService', () => {
    let service: ConnectStationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConnectStationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
