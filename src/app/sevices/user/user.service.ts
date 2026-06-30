import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, from, Observable, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { MessageService } from './../message/message.service';
import { UserApiService } from './user-api.service';
import { IUser } from './user.tupe';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  readonly users$: Observable<IUser[]> = this.usersSubject.asObservable();

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
          return from([]);
        }),
        finalize(() => {
          console.log(`hide`);
          this.loaderService.hideLoader();
        }),
        tap((users: IUser[]) => this.setUsers(users)),
      )
      .subscribe();
  }
}
