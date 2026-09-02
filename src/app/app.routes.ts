import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';

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
    path: 'posts',
    loadComponent: () => import('./features/posts/posts/posts.component').then((m) => m.PostsPage),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent,
      ),
    resolve: {
      post: postResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundPage),
  },
];
