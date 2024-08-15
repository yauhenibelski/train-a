import { ValidatorFn } from '@angular/forms';

export const isLatitude: ValidatorFn = ({ value }) => {
    const err = { isLatitude: 'Invalid value' };

    return Number.isFinite(value) && Math.abs(value) <= 85.1 ? null : err;
};
