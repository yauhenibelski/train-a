import { ValidatorFn } from '@angular/forms';

export const isLongitude: ValidatorFn = ({ value }) => {
    const err = { isLatitude: 'Invalid value' };

    return Number.isFinite(value) && Math.abs(value) <= 180 ? null : err;
};
