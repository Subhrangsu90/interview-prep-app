import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  template: `
    <main class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section class="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p class="text-sm font-medium text-indigo-700">Interview Prep</p>
        <h1 class="mt-1 mb-6 text-2xl font-semibold text-slate-900">{{ heading() }}</h1>
        <ng-content />
      </section>
    </main>
  `,
})
export class AuthCard {
  readonly heading = input.required<string>();
}
