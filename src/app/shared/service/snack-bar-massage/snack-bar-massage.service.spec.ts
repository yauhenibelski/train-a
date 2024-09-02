import { TestBed } from '@angular/core/testing';

import { SnackBarMassageService } from './snack-bar-massage.service';

describe('SnackBarMassageService', () => {
    let service: SnackBarMassageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SnackBarMassageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
