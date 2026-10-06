import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private ROOT_URL = 'https://dummyjson.com';

  getPosts(userId: number): Observable<Post[]> {
    return this.http
      .get<{ posts: Post[] }>(`${this.ROOT_URL}/posts/user/${userId}?limit=0`)
      .pipe(map((response) => response.posts));
  }
}
