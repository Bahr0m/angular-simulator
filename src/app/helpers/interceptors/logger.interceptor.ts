import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  let status: number | string = 'unknown';

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          status = event.status;
        }
      },
      error: (error: unknown) => {
        status = error instanceof HttpErrorResponse ? error.status : 'error';
      },
    }),
    finalize(() => {
      const time = performance.now() - start;
      console.log(
        `METHOD: ${req.method}, URL: ${req.urlWithParams}, Status: ${status}, Time: ${time.toFixed(2)}ms`
      );
    })
  );
};
