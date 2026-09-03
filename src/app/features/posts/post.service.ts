import { inject, Service } from '@angular/core';
import { finalize } from 'rxjs';
import { IPost } from './post';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../services/message/message.service';

@Service()
export class PostService {
  private postApi: PostApiService = inject(PostApiService);
  private messageService = inject(MessageService);
  posts: IPost[] = [];
  total: number = 0;
  loading: boolean = false;

  getPosts(limit: number, skip: number): void {
    this.loading = true;
    this.postApi.getPosts(limit, skip)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        console.log('Fetched posts:', response.posts);
        this.posts = response.posts;
        this.total = response.total;
      });
  }

  createPost(newPost: IPost) {
    this.postApi.addPost(newPost).subscribe({
      next: () => {
        this.messageService.showSuccess('Пост успешно создан.');
        this.posts.push(newPost);
        this.total++;
      },
      error: (error) => {
        if (error.status < 500) {
          this.messageService.showError('Не удалось создать пост.');
        }
      },
    });
  }

  removePost(id: number) {
    this.postApi.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.total--;
    });
  }

  getPostById(id: number): IPost {
    let post: IPost | undefined;
    this.postApi.getPostById(id).subscribe((newPost) => {
      console.log('Fetched post by ID:', newPost);
      post = newPost;
    });
    return post!;
  }

  updatePost(updatedPost: IPost) {
    this.postApi.updatePost(updatedPost).subscribe({
      next: (updatedPost) => {
        this.messageService.showSuccess('Post updated successfully');
        this.posts = this.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
        return updatedPost;
      },
      error: (error) => {
        console.error('Error updating post:', error);
        this.messageService.showError('Failed to update post');
      },
    });
  }
}
