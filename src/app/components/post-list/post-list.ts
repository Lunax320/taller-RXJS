import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';
import { PostCard } from '../post-card/post-card';

@Component({
  imports: [PostCard],
  selector: 'app-post-list',
  styleUrl: './post-list.scss',
  templateUrl: './post-list.html',
})
export class PostList {
  @Input() posts: Post[] = [];
  @Input() comments: Comment[] = [];

  getComments(postId: number): Comment[] {
    return this.comments.filter((comment) => comment.postId === postId);
  }
}
