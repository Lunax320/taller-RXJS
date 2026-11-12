import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private ROOT_URL = 'https://dummyjson.com';

  getComments(postId: number): Observable<Comment[]> {
    return this.http
      .get<{ comments: Comment[] }>(`${this.ROOT_URL}/comments/post/${postId}?limit=0`)
      .pipe(map((response) => response.comments));
  }
}
