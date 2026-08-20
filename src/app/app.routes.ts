import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundPage),
  },
];
