import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.isAuth()) {
    const username = authService.getUser();
    const password = authService.getPassword();

    const headers = btoa(`${username}:${password}`);

    req = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + headers)
    })
  }

  return next(req);
};
