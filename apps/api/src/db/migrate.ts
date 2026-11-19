import { fileURLToPath } from 'node:url';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './client.js';

// fileURLToPath (not URL.pathname) so Windows gets G:\... instead of /G:/...
const migrationsFolder = fileURLToPath(new URL('../../drizzle', import.meta.url));

// pgvector is needed from Phase 6 (Ask my notes). The Docker image has it; a plain local Postgres may not.
try {
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
} catch {
  console.warn('pgvector extension not available; skipping (needed only for Ask my notes).');
}
await migrate(db, { migrationsFolder });
console.log('Migrations applied');
await pool.end();
