import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './post';

interface IPostsResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

@Service()
export class PostApiService {
    http=inject(HttpClient);

    getPosts(params: any): Observable<IPostsResponse> {
      return this.http.get<IPostsResponse>('https://dummyjson.com/posts', {
        params: {
          limit: '10',
          skip: '0',
        }
      });
    }

    getPostById(id: number): Observable<IPost> {
      return this.http.get<IPost>(`https://dummyjson.com/posts/${id}`);
    }

    addPost(post: IPost): Observable<IPost> {
      return this.http.post<IPost>('https://dummyjson.com/posts/add', post);
    }

    updatePost(post: IPost): Observable<IPost> {
      return this.http.put<IPost>(`https://dummyjson.com/posts/${post.id}`, post);
    }

}
