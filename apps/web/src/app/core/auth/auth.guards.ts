import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// inject() must run before any await, while the injection context is still active.

export const authGuard: CanMatchFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.ensureLoaded();
  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};

export const guestGuard: CanMatchFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.ensureLoaded();
  return auth.isLoggedIn() ? router.parseUrl('/dashboard') : true;
};
