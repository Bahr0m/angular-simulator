import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
} from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../services/user/user.type';
import { PluralPipe } from '../../helpers/pipes/plural.pipe';

@Component({
  selector: 'users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent,PluralPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersPage implements OnInit {
  private usersService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.usersService.getUsers();
  private filterSubject = new BehaviorSubject('');

  public filteredUsers$ = combineLatest([
    this.users$,
    this.filterSubject.asObservable().pipe(debounceTime(200), distinctUntilChanged()),
  ]).pipe(
    map(([users, filterTerm]) => {
      const term = filterTerm.toLowerCase().trim();
      return users.filter((user) => user.name.toLowerCase().includes(term));
    }),
  );

  ngOnInit() {
    this.usersService.loadUsers();
  }

  onFilterUsers(filterValue: string): void {
    this.filterSubject.next(filterValue);
  }

  onRemoveUser(id: number) {
    this.usersService.removeUser(id);
  }

  addUser(user: IUser) {
    this.usersService.createUser(user);
  }
}
