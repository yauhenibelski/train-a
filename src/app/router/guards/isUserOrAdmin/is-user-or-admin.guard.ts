import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth/auth.service';
import { map } from 'rxjs';

export const isUserOrAdminGuard: CanMatchFn = () => {
    const router = inject(Router);

    return inject(AuthService).userType$.pipe(
        map(type => {
            if (type === 'user' || type === 'admin') {
                router.navigateByUrl('/');

                return true;
            }

            return false;
        }),
    );
};
