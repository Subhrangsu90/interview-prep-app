import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgres://prep:prep@localhost:5432/prep_test',
      JWT_SECRET: 'test-secret-that-is-at-least-32-characters-long',
    },
  },
});
