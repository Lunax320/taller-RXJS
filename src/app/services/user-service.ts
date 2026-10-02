import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, DummyUserResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ROOT_URL = 'https://dummyjson.com';
  private http = inject(HttpClient);

  searchUser(username: string): Observable<User | null> {
    return this.http
      .get<DummyUserResponse>(`${this.ROOT_URL}/users/filter?key=username&value=${encodeURIComponent(username)}`)
      .pipe(
        map(res => (res.users && res.users.length > 0) ? res.users[0] : null)
      );
  }
}