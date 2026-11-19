import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import type { LoginInput, PublicUser, RegisterInput } from '@prep/shared';
import { firstValueFrom } from 'rxjs';

interface UserResponse {
  user: PublicUser;
}

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/auth';
  private loading: Promise<void> | null = null;

  private readonly _user = signal<PublicUser | null>(null);
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  /** Checks the session with the API once per page load; read `isLoggedIn()` afterwards. */
  ensureLoaded(): Promise<void> {
    this.loading ??= firstValueFrom(this.http.get<UserResponse>(`${this.base}/me`))
      .then((r) => this._user.set(r.user))
      .catch(() => this._user.set(null));
    return this.loading;
  }

  async login(input: LoginInput): Promise<void> {
    const r = await firstValueFrom(this.http.post<UserResponse>(`${this.base}/login`, input));
    this._user.set(r.user);
  }

  async register(input: RegisterInput): Promise<void> {
    const r = await firstValueFrom(this.http.post<UserResponse>(`${this.base}/register`, input));
    this._user.set(r.user);
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.http.post(`${this.base}/logout`, {}));
    this._user.set(null);
  }
}
