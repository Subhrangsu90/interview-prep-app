import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './client.js';

// pgvector is needed from Phase 6 (Ask my notes). The Docker image has it; a plain local Postgres may not.
try {
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
} catch {
  console.warn('pgvector extension not available; skipping (needed only for Ask my notes).');
}
await migrate(db, { migrationsFolder: new URL('../../drizzle', import.meta.url).pathname });
console.log('Migrations applied');
await pool.end();
