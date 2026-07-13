import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { MessageService } from './../message/message.service';
import { UserApiService } from './user-api.service';
import { IUser } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  readonly users$: Observable<IUser[]> = this.usersSubject.asObservable();


  removeUser(id: number) {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.filter((user) => user.id !== id);
    this.setUsers(updatedUsers);
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.users$;
  }

  loadUsers() {
    this.loaderService.showLoader();
    this.userApi
      .getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось получить пользователей');
          return of([]);
        }),
        tap((users: IUser[]) => this.setUsers(users)),

        finalize(() => {
          console.log(`hide`);
          this.loaderService.hideLoader();
        }),
      )
      .subscribe();
  }
}
