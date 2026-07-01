import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../services/user/user.type';

@Component({
  selector: 'users-page',
  imports: [AsyncPipe],
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
