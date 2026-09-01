import { inject, Service } from '@angular/core';
import { finalize } from 'rxjs';
import { IPost } from './post';
import { PostApiService } from './post-api.service';

@Service()
export class PostService {
  private PostApi: PostApiService = inject(PostApiService);
  posts: IPost[] = [];
  total: number = 0;
  loading: boolean = false;

  getPosts(limit: number, skip: number): void {
    this.loading = true;
    this.PostApi.getPosts(limit, skip)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        console.log('Fetched posts:', response.posts);
        this.posts = response.posts;
        this.total = response.total;
      });
  }

  // addPost(newPost: IPost) {
  //   const posts = this.postsSubject.getValue();
  //   const updatedPosts = [...posts, newPost];
  //   this.setPosts(updatedPosts);
  // }

  removePost(id: number) {
    this.PostApi.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.total--;
    });
  }

  // updatePost(updatedPost: IPost) {
  //   const posts = this.postsSubject.getValue();
  //   const updatedPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
  //   this.setPosts(updatedPosts);
  // }
}
