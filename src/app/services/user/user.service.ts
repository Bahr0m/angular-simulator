import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { LocalStoreService } from '../localStor/local-store.service';
import { MessageService } from './../message/message.service';
import { UserApiService } from './user-api.service';
import { IUser } from './user.type';

export const localStorageKey = 'users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private UserApi: UserApiService = inject(UserApiService);
  private LocalStoreService: LocalStoreService = inject(LocalStoreService);
  private MessageService: MessageService = inject(MessageService);
  private LoaderService: LoaderService = inject(LoaderService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  readonly users$: Observable<IUser[]> = this.usersSubject.asObservable();

  createUser(newUser: IUser) {
    const users = this.usersSubject.getValue();
    const updatedUsers = [...users, newUser];
    this.setUsers(updatedUsers);
  }

  removeUser(id: number) {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.filter((user) => user.id !== id);
    this.setUsers(updatedUsers);
  }

  setUsers(users: IUser[]): void {
    this.LocalStoreService.set(localStorageKey, users);
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.users$;
  }

  loadUsers() {
    this.LoaderService.showLoader();
    const storedUsers = this.LocalStoreService.get(localStorageKey) as IUser[] | null;
    const users$ = storedUsers ? of(storedUsers) : this.UserApi.getUsers();
    users$
      .pipe(
        catchError(() => {
          this.MessageService.showError('Не удалось получить пользователей');
          return of([]);
        }),
        tap((users: IUser[]) => this.setUsers(users)),
        finalize(() => {
          this.LoaderService.hideLoader();
        }),
      )
      .subscribe();
  }
}
