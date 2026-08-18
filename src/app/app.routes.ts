import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.component').then((m) => m.UsersPage),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundPage),
  },
];
