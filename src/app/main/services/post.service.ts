import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/dev';
import { IPost } from '../interfaces/data.interface';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPosts(
    page: number = 1,
    perPage: number = 10,
    searchTerm?: string
  ): Observable<IPost[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', perPage.toString());
    if (searchTerm) {
      params = params.set('q', searchTerm);
    }

    return this.http.get<IPost[]>(`${this.apiUrl}/posts`, { params });
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}/posts/${postId}`);
  }

  createPost(post: IPost) {
    return this.http.post(`${this.apiUrl}/posts`, post);
  }

  updatePost(postId: number, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.apiUrl}/posts/${postId}`, post);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`);
  }
}
