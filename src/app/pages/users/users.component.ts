import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../sevices/user/user.service';
import { IUser } from '../../sevices/user/user.tupe';

@Component({
  selector: 'users-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersPage {
  private usersService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.usersService.getUsers();

  constructor() {
    this.usersService.loadUsers();
  }
}
