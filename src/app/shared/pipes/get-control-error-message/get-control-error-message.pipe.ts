import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
    name: 'getControlErrorMessage',
    standalone: true,
})
export class GetControlErrorMessagePipe implements PipeTransform {
    transform(errors: ValidationErrors | null): string {
        return errors ? Object.values(errors).at(0) : null;
    }
}
