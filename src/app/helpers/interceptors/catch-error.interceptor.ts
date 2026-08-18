import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../../services/message/message.service';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messages = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500) {
        console.error('HTTP Error:', error);
        messages.showError('Произошла ошибка на сервере. Пожалуйста, попробуйте позже.');
      }
      return throwError(() => error);
    })
  );
};
