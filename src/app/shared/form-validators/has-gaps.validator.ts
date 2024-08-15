import { ValidatorFn } from '@angular/forms';

export const hasGaps: ValidatorFn = ({ value }) => {
    return value.match(/^\S+$/) ? null : { hasSpace: 'There should be no gaps' };
};
