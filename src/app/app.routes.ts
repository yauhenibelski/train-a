import { Routes } from '@angular/router';
import { CarriagesPageComponent } from '@pages/admin-page/carriages-page/carriages-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminPageComponent,
    },
    {
        path: 'admin/carriages',
        component: CarriagesPageComponent,
    },
];
