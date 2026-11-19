import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <h1 class="text-2xl font-semibold">Welcome, {{ auth.user()?.name }}</h1>
    <p class="mt-2 text-slate-600">
      Your default syllabus (7 tracks, 15 modules) is ready. The tracker screens arrive in Phase 1.
    </p>
    <ul class="mt-6 grid gap-4 sm:grid-cols-3">
      @for (card of cards; track card.title) {
        <li class="rounded-lg border border-slate-200 bg-white p-4">
          <h2 class="font-medium">{{ card.title }}</h2>
          <p class="mt-1 text-sm text-slate-600">{{ card.body }}</p>
        </li>
      }
    </ul>
  `,
})
export class DashboardPage {
  protected readonly auth = inject(AuthService);
  protected readonly cards = [
    { title: 'Readiness', body: 'Per-track readiness scores (Phase 1).' },
    { title: 'Due today', body: 'Flashcards due for review (Phase 3).' },
    { title: "Today's plan", body: 'Tasks from your study plan (Phase 4).' },
  ];
}
