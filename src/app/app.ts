import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormSubmittedEvent } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from './services/user-service';
import { User } from './models/user';
import { Navbar } from './components/navbar/navbar';
import { UserProfile } from './components/user-profile/user-profile'

@Component({
  imports: [RouterOutlet, ReactiveFormsModule, Navbar, UserProfile],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
private userService = inject(UserService);

  userForm = new FormGroup({
    username: new FormControl('')
  });

  user: User | null = null;
  haBuscado: boolean = false;
  usuarioNoEncontrado: boolean = false;

  constructor() {
    this.userForm.events.pipe(
      filter(e => e instanceof FormSubmittedEvent),
      switchMap(() => {
        const username = this.userForm.value.username?.trim();

        if (!username) {
          this.haBuscado = false;
          this.usuarioNoEncontrado = false;
          return of(null);
        }

        this.haBuscado = true;
        return this.userService.searchUser(username);
      })
    ).subscribe((usuarioEncontrado) => {
      this.user = usuarioEncontrado;
      this.usuarioNoEncontrado = this.haBuscado && !usuarioEncontrado;
    });
  }
}
