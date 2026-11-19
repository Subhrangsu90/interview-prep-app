import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { apiErrorMessage } from '../../core/http/api-error';
import { AuthCard } from './auth-card';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, AuthCard],
  templateUrl: './auth-form.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly mode: 'login' | 'register' = 'login';
  protected readonly error = signal<string | null>(null);
  protected readonly busy = signal(false);
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected async submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.busy.set(true);
    this.error.set(null);
    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.login({ email, password });
      await this.router.navigateByUrl('/dashboard');
    } catch (e) {
      this.error.set(apiErrorMessage(e));
    } finally {
      this.busy.set(false);
    }
  }
}
