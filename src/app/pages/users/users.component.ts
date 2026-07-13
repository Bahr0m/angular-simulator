import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../services/user/user.type';

@Component({
  selector: 'users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersPage implements OnInit {
  private usersService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.usersService.getUsers();
  private searchTerm$ = new BehaviorSubject('');

  filteredUsers$ = combineLatest([this.users$, this.searchTerm$]).pipe(
    map(([users, term]) =>
      users.filter((u) => u.name.toLowerCase().includes(term.toLowerCase().trim())),
    ),
  );

  ngOnInit() {
    this.usersService.loadUsers();
  }

  removeUser(id: number) {
    this.usersService.removeUser(id);
  }

  addUser(user: IUser) {
    this.usersService.createUser(user);
  }
}
