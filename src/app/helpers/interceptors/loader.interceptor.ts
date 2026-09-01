import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  let status: number | string = 'unknown';
  const loaderService: LoaderService = inject(LoaderService);
  loaderService.showLoader();
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
      loaderService.hideLoader();
      const time = performance.now() - start;
      console.log(
        `METHOD: ${req.method}, URL: ${req.urlWithParams}, Status: ${status}, Time: ${time.toFixed(2)}ms`
      );
    })
  );
};
