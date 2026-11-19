import { HttpInterceptorFn } from '@angular/common/http';

/** Sends the httpOnly session cookie with every API call. */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.url.startsWith('/api/') ? req.clone({ withCredentials: true }) : req);
