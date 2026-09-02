import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { PostService } from './post.service';
import { IPost } from './post';

export const postResolver: ResolveFn<IPost> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const postService = inject(PostService);
  try {
    return await postService.getPostById(route.params['id']);
  } catch {
    return new RedirectCommand(router.parseUrl('/404'));
  }
};
