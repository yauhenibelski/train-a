import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth/auth.service';
import { map } from 'rxjs';

export const isGuestGuard: CanMatchFn = () => {
    const router = inject(Router);

    return inject(AuthService).userType$.pipe(
        map(type => {
            if (type === 'user') {
                const homePage = router.parseUrl('/');

                return new RedirectCommand(homePage);
            }

            return type === 'guest';
        }),
    );
};
