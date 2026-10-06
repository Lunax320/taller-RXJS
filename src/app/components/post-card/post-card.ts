import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';
import { CommentCard } from '../comment-card/comment-card';

@Component({
  imports: [CommentCard],
  selector: 'app-post-card',
  styleUrl: './post-card.scss',
  templateUrl: './post-card.html',
})
export class PostCard {
  @Input() post: Post | null = null;
  @Input() comments: Comment[] = [];
}
