import { HttpErrorResponse } from '@angular/common/http';

/** Pulls the user-facing message out of the API's `{ error: { message } }` body. */
export function apiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) return 'Cannot reach the server. Is the API running?';
    const message = err.error?.error?.message;
    if (typeof message === 'string') return message;
  }
  return fallback;
}
