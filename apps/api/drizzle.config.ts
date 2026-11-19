/// <reference types="node" />
import { existsSync } from 'node:fs';
import { defineConfig } from 'drizzle-kit';

// drizzle-kit doesn't read .env itself; load the repo-root one (scripts run from apps/api).
if (!process.env.DATABASE_URL && existsSync('../../.env')) process.loadEnvFile('../../.env');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? 'postgres://prep:prep@localhost:5434/prep' },
});
