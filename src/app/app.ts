import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormSubmittedEvent } from '@angular/forms';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { UserService } from './services/user-service';
import { PostService } from './services/post-service';
import { CommentService } from './services/comment-service';
import { User } from './models/user';
import { Post } from './models/post';
import { Comment } from './models/comment';
import { Navbar } from './components/navbar/navbar';
import { UserProfile } from './components/user-profile/user-profile';
import { PostList } from './components/post-list/post-list';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, Navbar, UserProfile, PostList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private userService = inject(UserService);
  private postService = inject(PostService);
  private commentService = inject(CommentService);

  userForm = new FormGroup({
    username: new FormControl(''),
  });

  user: User | null = null;
  haBuscado: boolean = false;
  usuarioNoEncontrado: boolean = false;
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor() {
    this.userForm.events
      .pipe(
        filter((e) => e instanceof FormSubmittedEvent),
        switchMap(() => {
          const username = this.userForm.value.username?.trim() ?? '';
          this.user = null;
          this.posts = [];
          this.comments = [];
          this.haBuscado = username.length > 0;
          this.usuarioNoEncontrado = false;

          if (!username) {
            return of({ user: null, posts: [], comments: [] });
          }

          return this.userService.searchUser(username).pipe(
            concatMap((usuarioEncontrado) => {
              if (!usuarioEncontrado) {
                return of({ user: null, posts: [], comments: [] });
              }

              return this.postService.getPosts(usuarioEncontrado.id).pipe(
                concatMap((posts) => {
                  if (posts.length === 0) {
                    return of({ user: usuarioEncontrado, posts, comments: [] });
                  }

                  const comments: Comment[] = [];

                  return from(posts).pipe(
                    concatMap((post) =>
                      this.commentService.getComments(post.id).pipe(
                        map((postComments) => {
                          for (const comment of postComments) {
                            comments.push(comment);
                          }
                          return post;
                        }),
                      ),
                    ),
                    filter((post) => post.id === posts[posts.length - 1].id),
                    map(() => ({ user: usuarioEncontrado, posts, comments })),
                  );
                }),
              );
            }),
          );
        }),
      )
      .subscribe({
        next: (response) => {
          this.user = response.user;
          this.posts = response.posts;
          this.comments = response.comments;
          this.usuarioNoEncontrado = this.haBuscado && !response.user;
        },
        error: (error: unknown) => console.error(error),
      });
  }
}
