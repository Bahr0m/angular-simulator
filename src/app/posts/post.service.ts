import { inject, Service } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { LoaderService } from './../services/loader/loader.service';
import { IPost } from './post';
import { PostApiService } from './post-api.service';

@Service()
export class PostService {
  private PostApi: PostApiService = inject(PostApiService);
  private LoaderService: LoaderService = inject(LoaderService);
  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  readonly posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  getPosts(params: any) {
    this.LoaderService.showLoader();
    this.PostApi.getPosts(params).pipe(
      tap((response) => {
        this.setPosts(response.posts);
      }),
      finalize(() => {
        this.LoaderService.hideLoader();
      }),
    ).subscribe();
  }

  setPosts(posts: IPost[]): void {
    this.postsSubject.next(posts);
  }

  addPost(newPost: IPost) {
    const posts = this.postsSubject.getValue();
    const updatedPosts = [...posts, newPost];
    this.setPosts(updatedPosts);
  }

  removePost(id: number) {
    const posts = this.postsSubject.getValue();
    const updatedPosts = posts.filter((post) => post.id !== id);
    this.setPosts(updatedPosts);
  }

  updatePost(updatedPost: IPost) {
    const posts = this.postsSubject.getValue();
    const updatedPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    this.setPosts(updatedPosts);
  }
}
