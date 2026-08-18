import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  return next(req).pipe(
    finalize(() => {
      const time = performance.now() - start;
      console.log(`METHOD: ${req.method}, URL: ${req.url}, Status: ${req.headers.get('status')}, Time: ${time.toFixed(2)}ms`);
    })
  );
};
