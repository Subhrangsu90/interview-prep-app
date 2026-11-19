import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface NavItem {
  label: string;
  path: string;
  phase?: number;
}

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <header class="border-b border-slate-200 bg-white">
        <div class="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
          <a routerLink="/dashboard" class="font-semibold text-indigo-700">Interview Prep</a>
          <nav aria-label="Main" class="flex flex-1 flex-wrap gap-1 text-sm">
            @for (item of nav; track item.path) {
              @if (item.phase) {
                <span
                  class="cursor-not-allowed rounded px-3 py-1.5 text-slate-500"
                  [attr.title]="'Coming in Phase ' + item.phase"
                  >{{ item.label }}</span
                >
              } @else {
                <a
                  [routerLink]="item.path"
                  routerLinkActive="bg-indigo-50 text-indigo-800"
                  ariaCurrentWhenActive="page"
                  class="rounded px-3 py-1.5 hover:bg-slate-100"
                  >{{ item.label }}</a
                >
              }
            }
          </nav>
          <span class="hidden text-sm text-slate-600 sm:inline">{{ auth.user()?.name }}</span>
          <button
            type="button"
            (click)="logout()"
            class="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </header>
      <main class="mx-auto max-w-6xl px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class Shell {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly nav: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Syllabus', path: '/syllabus', phase: 1 },
    { label: 'Courses', path: '/courses', phase: 1 },
    { label: 'Practice', path: '/practice', phase: 3 },
    { label: 'Flashcards', path: '/flashcards', phase: 3 },
    { label: 'Planner', path: '/planner', phase: 4 },
    { label: 'Mock interview', path: '/mock', phase: 5 },
  ];

  protected async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/login');
  }
}
