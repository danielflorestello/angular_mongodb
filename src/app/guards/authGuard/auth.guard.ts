import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    return true;

  } else {
    const url = router.createUrlTree(['/']);
    console.log('No se ha iniciado sesión');
    return url;
  }
  
};
