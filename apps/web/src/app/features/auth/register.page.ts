import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { apiErrorMessage } from '../../core/http/api-error';
import { AuthCard } from './auth-card';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, AuthCard],
  templateUrl: './auth-form.html',
})
export class RegisterPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly mode: 'login' | 'register' = 'register';
  protected readonly error = signal<string | null>(null);
  protected readonly busy = signal(false);
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected async submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.busy.set(true);
    this.error.set(null);
    try {
      await this.auth.register(this.form.getRawValue());
      await this.router.navigateByUrl('/dashboard');
    } catch (e) {
      this.error.set(apiErrorMessage(e));
    } finally {
      this.busy.set(false);
    }
  }
}
