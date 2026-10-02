import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  imports: [],
  selector: 'app-user-profile',
  styleUrl: './user-profile.scss',
  templateUrl: './user-profile.html',
})
export class UserProfile {
  @Input() user: User | null = null;
}
