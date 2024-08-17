import { ValidatorFn } from '@angular/forms';

export const required =
    (message?: string): ValidatorFn =>
    ({ value }) => {
        const isNumber = Number.isInteger(value);
        const err = { required: message ?? 'Should not be empty' };

        if (isNumber) {
            return null;
        }

        return value ? null : err;
    };
