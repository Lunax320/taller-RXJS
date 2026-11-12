import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  imports: [],
  selector: 'app-comment-card',
  styleUrl: './comment-card.scss',
  templateUrl: './comment-card.html',
})
export class CommentCard {
  @Input() comment: Comment | null = null;
}
