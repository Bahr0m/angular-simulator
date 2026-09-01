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
  http = inject(HttpClient);
  baseUrl: string = 'https://dummyjson.com/posts';
  getPosts(limit: number, skip: number): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(this.baseUrl, {
      params: {
        limit,
        skip,
      },
    });
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.baseUrl}/${id}`);
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.baseUrl}/add`, post);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.baseUrl}/${post.id}`, post);
  }
}
