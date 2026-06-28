import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { NotFoundPage } from './pages/not-found/not-found.component';
import { UsersPage } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'users', component: UsersPage },
  { path: '**', component: NotFoundPage },
];
